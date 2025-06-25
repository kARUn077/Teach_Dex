import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId,
        userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Stripe session creation failed" });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const stripeWebhook = async (req, res) => {
  console.log("✅ Stripe webhook (unverified) called");

  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    return res.status(400).send("Webhook Error: Invalid JSON");
  }

  if (event.type === "checkout.session.completed") {
    console.log("🎯 Checkout session completed event received");

    const session = event.data.object;
    try {
      // 🔁 Retry finding the CoursePurchase up to 5 times
      let purchase;
      for (let i = 0; i < 5; i++) {
        purchase = await CoursePurchase.findOne({
          paymentId: session.id,
        }).populate("courseId");
        if (purchase) break;
        await new Promise((resolve) => setTimeout(resolve, 200)); // wait 200ms
      }

      if (!purchase) {
        console.warn("⚠️ Purchase not found for session:", session.id);
        return res.status(404).end();
      }

      // ✅ Update purchase
      purchase.status = "completed";
      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      await purchase.save();

      // ✅ Enroll user in course
      await User.findByIdAndUpdate(purchase.userId, {
        $addToSet: { enrolledCourses: purchase.courseId._id },
      });

      // ✅ Add student to course
      await Course.findByIdAndUpdate(purchase.courseId._id, {
        $addToSet: { enrolledStudents: purchase.userId },
      });

      // ✅ Mark lectures as preview if needed
      const lectureIds = purchase.courseId.lectures;
      if (lectureIds && lectureIds.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: lectureIds } },
          { $set: { isPreviewFree: true } }
        );
      }

      res.status(200).send();
    } catch (error) {
      console.error("Webhook processing error:", error);
      return res.status(500).json({ message: "Processing error" });
    }
  } else {
    // For all other Stripe events
    res.status(200).send("Event type ignored");
  }
};

// Get course with user’s purchase status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate({
        path: "lectures",
        select: "lectureTitle videoUrl isPreviewFree",
      });

    if (!course) return res.status(404).json({ message: "Course not found!" });

    const purchased = await CoursePurchase.findOne({
      courseId,
      userId,
      status: "completed",
    });

    return res.status(200).json({
      course: course, // ✅ fix this line
      purchased: !!purchased,
    });
  } catch (error) {
    console.error("Error getting course detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all purchased courses (for admin/testing)
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    res.status(200).json({
      purchasedCourse: purchasedCourse || [],
    });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
