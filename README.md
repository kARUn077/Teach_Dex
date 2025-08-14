
# 🎓 Learnfinity – Online Learning Management System

Learnfinity is a full-featured, modern **Learning Management System (LMS)** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It empowers students and instructors through seamless course creation, video-based learning, secure Stripe payments, and elegant UI powered by **TailwindCSS + Shadcn UI**. API communication is managed with **Redux Toolkit Query (RTK Query)**.

![Learnfinity Banner](https://res.cloudinary.com/diziygks9/image/upload/v1752508923/Screenshot_2025-07-14_210030_t8ya9g.png) <!-- Optional banner -->

---

## 🌐 Tech Stack

- **Frontend:** React.js, TailwindCSS, Shadcn UI
- **State Management & API:** Redux Toolkit Query (RTK Query)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Cookie-based Sessions
- **Media Storage:** Cloudinary
- **Payments:** Stripe (with Webhooks)


---
## 🌐 Live Demo

- 🔗 Frontend: [learnfinity-tau.vercel.app](https://learnfinity-tau.vercel.app)

---

## 🚀 Features

### 🔐 Authentication

- Signup/Login with role: Student or Instructor
- Session management using cookies
- Role-based access protection (Instructor Dashboard, Course Purchase)

### 📚 Courses
- Course creation with:
  - Title, Subtitle, Description
  - Category, Level, Price
  - Video lectures and thumbnails
- Students can:
  - Browse and filter courses
  - Purchase courses using **Stripe**
  - Watch video lectures (React Player)
  - Track lecture completion
  - Mark entire course as completed

### 🎓 Instructor Dashboard
- Upload courses and lectures
- Manage published/unpublished courses
- View enrolled students

### 💳 Payments
- Secure checkout with Stripe
- Payment status stored in DB
- Webhook integration to update:
  - Enrolled students
  - Course purchase history

### 📈 Progress Tracking
- Lecture-level progress
- Course completion status
- Continue course button





- Signup/Login with roles: **Student** or **Instructor**
- Cookie-based session management
- Role-based route protection (e.g., Instructor-only dashboard)
  ![Learnfinity Banner](https://res.cloudinary.com/diziygks9/image/upload/v1752509051/Screenshot_2025-07-14_210111_nqo63p.png)

### 📚 Course Management
- **Instructors** can:
  - Create courses with title, subtitle, description, level, category, price
  - Upload video lectures and thumbnails
  - Publish/unpublish courses
- **Students** can:
  - Browse and filter courses by category or level
  - Purchase courses via **Stripe**
  - Watch videos (React Player)
  - Track lecture completion
  - Mark entire course as complete

### 🎓 Instructor Dashboard
- Upload and manage courses and video lectures
- Track enrolled students per course
- See course status (published/unpublished)
-   ![Learnfinity Banner](https://res.cloudinary.com/diziygks9/image/upload/v1752509051/Screenshot_2025-07-14_210144_xiaus6.png)
  ![Learnfinity Banner](https://res.cloudinary.com/diziygks9/image/upload/v1752509062/Screenshot_2025-07-14_210137_xinczi.png)


### 💳 Payments with Stripe
- Secure Stripe Checkout integration
- Webhooks for real-time updates:
  - Course enrollment
  - Purchase tracking
- Payment info stored in database

### 📈 Progress Tracking
- Track lecture-level progress
- Course completion status
- Resume from last watched lecture

---

### 📁 Folder Structure (Basic Overview)

```bash
learnfinity/
├── client/                         # React frontend
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable UI components (Navbar, CourseCard, etc.)
│   │   ├── pages/                  # Page-level views (Home, Dashboard, CourseView, etc.)
│   │   ├── redux/                  # Redux store and RTK Query setup
│   │   ├── utils/                  # Helper functions, API utils
│   │   └── App.jsx                 # Root component
│   └── package.json
│
├── server/                         # Backend (Express + MongoDB)
│   ├── controllers/                # Route logic (Auth, Courses, Payments, etc.)
│   ├── models/                     # Mongoose schemas (User, Course, Lecture)
│   ├── routes/                     # Express routes
│   ├── middlewares/               # Auth, error handlers, etc.
│   ├── utils/                      # Cloudinary, Stripe config, etc.
│   ├── webhooks/                   # Stripe webhook handler
│   └── server.js                  # Entry point
│
├── .env                            # Environment variables (not pushed to GitHub)
├── .gitignore
├── README.md
└── package.json                    # Root scripts (concurrently, start:dev, etc.)

```

---

## 🛠️ Getting Started

### ⚙️ Prerequisites
- Node.js
- MongoDB
- Stripe Account
- Cloudinary Account

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/kARUn077/Agile-architects.git
cd Agile-architects

# Install client and server dependencies
cd client && npm install
cd ../server && npm install

# Setup environment variables (.env)
# Example:
# MONGO_URI=your_mongodb_uri
# CLOUDINARY_CLOUD_NAME=xxx
# STRIPE_SECRET_KEY=xxx
# CLIENT_URL=http://localhost:3000
# SERVER_URL=http://localhost:5000

# Run the app
npm run dev   # Starts both frontend and backend
