import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import mongoose from "mongoose";

// Get course progress
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "lectures",
        select: "lectureTitle isPreviewFree videoInfo",
      })
      .lean();

    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    let courseProgress = await CourseProgress.findOne({ courseId, userId }).lean();
    const purchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed"
    });

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress?.lectureProgress || [],
        completed: courseProgress?.completed || false,
        purchased: !!purchased,
      },
    });
  } catch (error) {
    console.error("❌ getCourseProgress error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get course access
export const getCourseAccess = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({
        path: "lectures",
        select: "lectureTitle isPreviewFree videoInfo",
      })
      .lean();

    if (!course) return res.status(404).json({ message: "Course not found" });

    const purchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed"
    });

    const lectures = course.lectures.map(lecture => ({
      ...lecture,
      isAccessible: !!purchased || lecture.isPreviewFree
    }));

    return res.status(200).json({
      ...course,
      lectures,
      purchased: !!purchased
    });
  } catch (error) {
    console.error("Course access error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update lecture progress
export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        lectureProgress: [{ lectureId, viewed: true }],
        completed: false,
      });
    } else {
      const existing = courseProgress.lectureProgress.find(
        (lp) => lp.lectureId.toString() === lectureId
      );

      if (existing) {
        existing.viewed = true;
      } else {
        courseProgress.lectureProgress.push({ lectureId, viewed: true });
      }

      const course = await Course.findById(courseId);
      const totalLectures = course.lectures.length;
      const completedLectures = courseProgress.lectureProgress.filter(
        (lp) => lp.viewed
      ).length;

      courseProgress.completed = completedLectures === totalLectures;
    }

    await courseProgress.save();
    return res.status(200).json({ message: "Lecture progress updated successfully." });
  } catch (error) {
    console.error("❌ updateLectureProgress error:", error);
    return res.status(500).json({ message: "Failed to update lecture progress" });
  }
};

// Mark course as completed
export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId).lean();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const allLectures = course.lectures.map((lectureId) => ({
      lectureId: lectureId.toString(),
      viewed: true,
    }));

    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: true,
        lectureProgress: allLectures,
      });
    } else {
      courseProgress.lectureProgress = allLectures;
      courseProgress.completed = true;
    }

    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as completed." });
  } catch (error) {
    console.error("❌ markAsCompleted error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Mark course as incomplete
export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // Validate courseId is a proper ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await Course.findById(courseId).populate("lectures").lean();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }

    courseProgress.lectureProgress = course.lectures.map((lecture) => ({
      lectureId: lecture._id.toString(),
      viewed: lecture.isPreviewFree === true,
    }));

    courseProgress.completed = false;
    await courseProgress.save();

    return res.status(200).json({ message: "Course marked as incompleted." });
  } catch (error) {
    console.error("❌ markAsInCompleted error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};