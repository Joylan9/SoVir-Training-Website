<br/>

<p align="center">
  <img src="https://via.placeholder.com/800x120/0F172A/FFFFFF?text=SprachWeg" alt="SprachWeg Banner" width="100%" />
</p>

<h1 align="center">SprachWeg</h1>

<p align="center">
  <strong>Where Language Meets Industry — A Next-Gen Training Platform</strong>
</p>

<p align="center">
  <em>Empowering learners with German, English &amp; Japanese language courses alongside industrial skill training in PLC, SCADA, Industry 4.0 and more.</em>
</p>

<br/>

<p align="center">
  <a href="https://training.sovirtechnologies.in"><img src="https://img.shields.io/badge/🌐_Live_Site-training.sovirtechnologies.in-0F172A?style=for-the-badge" alt="Live Site" /></a>
  &nbsp;
  <a href="#-getting-started"><img src="https://img.shields.io/badge/🚀_Get_Started-Guide-6366F1?style=for-the-badge" alt="Get Started" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D14.0-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
</p>

---

## 📸 Preview

<p align="center">
  <img src="https://via.placeholder.com/900x500/1E293B/FFFFFF?text=Landing+Page+Screenshot" alt="Landing Page" width="80%" />
</p>

<p align="center">
  <sub><strong>↑ Landing Page</strong> — Premium hero section with course catalog, animated components, and responsive design</sub>
</p>

<br/>

<table>
<tr>
<td width="50%">
  <img src="https://via.placeholder.com/450x280/1E293B/FFFFFF?text=Admin+Dashboard" alt="Admin Dashboard" width="100%" />
  <p align="center"><sub><strong>Admin Dashboard</strong> — Full course, enrollment &amp; trainer management</sub></p>
</td>
<td width="50%">
  <img src="https://via.placeholder.com/450x280/1E293B/FFFFFF?text=Student+Dashboard" alt="Student Dashboard" width="100%" />
  <p align="center"><sub><strong>Student Dashboard</strong> — Enrolled courses, batch access &amp; progress</sub></p>
</td>
</tr>
</table>

> **💡 Replace the placeholder images above with actual screenshots:**
> - Landing page hero section
> - Admin dashboard (with course data visible)
> - Student dashboard (with enrollments)
> - Login/Register page (showing Google OAuth button)

---

## 📋 Overview

**SprachWeg** (German: *"Language Path"*) is a production-grade, full-stack training platform built for **SoVir Technologies**. It serves two distinct training verticals:

| Vertical | Offerings |
|:---:|---|
| 🌍 **Language Training** | German · English · Japanese — multi-level courses with exam prep |
| ⚙️ **Industrial Skills** | PLC Automation · SCADA & HMI · Industrial Drives · Industry 4.0 · Corporate Training |

The platform delivers **role-based experiences** for three user types — Students, Trainers, and Administrators — with enterprise-grade authentication, real-time enrollment workflows, and integrated Google Calendar scheduling.

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🔐 Authentication & Security
- JWT sessions with 30-day expiry
- Google OAuth 2.0 single sign-on
- Email OTP verification (Nodemailer)
- Forgot / Reset password flow
- Helmet security headers (XSS, clickjacking, sniffing)
- bcryptjs password hashing
- Whitelisted CORS origins

</td>
<td width="50%" valign="top">

### 📚 Course Management
- Dual-vertical catalog (language + industrial)
- Multi-level course structures with exam prep tiers
- Image uploads via Multer
- Dynamic course detail pages
- Admin CRUD with search & filtering
- Database seeding script for initial data

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 👥 Role-Based Dashboards
- **Student** — enrolled courses, batch access, progress
- **Trainer** — batch mgmt, attendance, assignments, materials, announcements
- **Admin** — full platform control, enrollment approval, trainer management, messaging

</td>
<td width="50%" valign="top">

### 🛠️ Platform Capabilities
- Google Calendar integration for class scheduling
- Enrollment workflows with admin approval pipeline
- Assignment submission & grading interface
- Attendance tracking per session
- Contact form & booking/trial request management
- Dark / Light theme toggle
- Profile completion enforcement modal

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      CLIENT  (SPA)                           │
│                                                              │
│   React 19  ·  Vite 7  ·  TailwindCSS 4  ·  Framer Motion  │
│   React Router 7  ·  Axios  ·  Google OAuth Provider         │
│                                                              │
│   ┌───────────┐  ┌────────────┐  ┌─────────────────────────┐ │
│   │  33+ Pages│  │ 11 Compnts │  │ AuthContext·ThemeContext │ │
│   └───────────┘  └────────────┘  └─────────────────────────┘ │
│                        │                                     │
│                   Axios /api/*                                │
├────────────────────────┼─────────────────────────────────────┤
│                        ▼                                     │
│                   SERVER  (REST API)                          │
│                                                              │
│   Express 5  ·  TypeScript  ·  Helmet  ·  CORS               │
│                                                              │
│   ┌───────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│   │ 13 Controllers│  │ 11 Route    │  │ JWT  +  Google     │ │
│   │               │  │ Groups      │  │ OAuth Middleware    │ │
│   └───────────────┘  └─────────────┘  └────────────────────┘ │
│   ┌───────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│   │ 19 Mongoose   │  │ Multer File │  │ Nodemailer  +      │ │
│   │ Models        │  │ Uploads     │  │ Google Calendar    │ │
│   └───────────────┘  └─────────────┘  └────────────────────┘ │
│                        │                                     │
├────────────────────────┼─────────────────────────────────────┤
│                        ▼                                     │
│            ┌─────────────────────────┐                       │
│            │  MongoDB (Atlas/Local)  │                       │
│            └─────────────────────────┘                       │
│                                                              │
│   Frontend: Firebase Hosting  ·  Backend: Linux Server       │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96"><img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black" /><br/><sub>React 19</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" /><br/><sub>Vite 7</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /><br/><sub>TypeScript 5.9</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" /><br/><sub>TailwindCSS 4</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" /><br/><sub>Node.js</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white" /><br/><sub>Express 5</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" /><br/><sub>MongoDB</sub></td>
<td align="center" width="96"><img src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" /><br/><sub>Firebase</sub></td>
</tr>
</table>

| Layer | Technologies |
|:---:|---|
| **Frontend** | React 19 · Vite 7 · TypeScript · TailwindCSS 4 · Framer Motion · React Router 7 · Axios · Lucide Icons · react-hot-toast |
| **Backend** | Node.js · Express 5 · TypeScript · Mongoose 9 · class-validator · Multer · Nodemailer · Helmet |
| **Auth** | JWT (jsonwebtoken) · bcryptjs · Google OAuth 2.0 · OTP Email Verification |
| **Database** | MongoDB (Atlas or Local) |
| **Services** | Google Calendar API · SMTP Email (Gmail) |
| **Hosting** | Firebase Hosting (Frontend) · Linux Server (Backend) |

---

## 🌐 Live Demo

| | Link |
|:---:|---|
| 🔗 **Production** | [training.sovirtechnologies.in](https://training.sovirtechnologies.in) |
| 📦 **Repository** | [github.com/Akash-Shenvi/SprachWeg](https://github.com/Akash-Shenvi/SprachWeg) |

---

<details>
<summary><h2>📁 Project Structure</h2></summary>

```
SprachWeg/
│
├── Backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts                     # Entry point — connects DB, starts server
│       ├── app.ts                        # Express app — middleware + 14 route mounts
│       ├── seedCourses.ts                # DB seed script (languages + skills)
│       │
│       ├── config/
│       │   ├── database.ts               # MongoDB connection
│       │   ├── env.ts                    # Centralized env vars
│       │   └── multer.ts                 # File upload storage config
│       │
│       ├── controllers/                  # 13 controllers
│       │   ├── auth.controller.ts        # Register, Login, OTP, Password reset
│       │   ├── auth.google.controller.ts # Google OAuth flow
│       │   ├── dashboard.controller.ts   # Student & Trainer data aggregation
│       │   ├── enrollment.controller.ts  # Skill enrollment accept/reject
│       │   ├── language.enrolment.controller.ts
│       │   ├── language.trainer.controller.ts  # Batches, classes, attendance, assignments
│       │   ├── languageCourse.controller.ts
│       │   ├── skillCourse.controller.ts
│       │   ├── skillTrainingDetail.controller.ts
│       │   ├── contact.controller.ts
│       │   ├── trialRequestController.ts
│       │   ├── user.controller.ts
│       │   └── item.controller.ts
│       │
│       ├── models/                       # 19 Mongoose schemas
│       │   ├── user.model.ts             # Roles, OTP, Google ID, profile virtual
│       │   ├── skillCourse.model.ts      # Multi-level with exam prep
│       │   ├── languageCourse.model.ts
│       │   ├── enrollment.model.ts
│       │   ├── language.enrollment.model.ts
│       │   ├── batch.model.ts
│       │   ├── language.batch.model.ts
│       │   ├── classSession.model.ts
│       │   ├── language.class.model.ts
│       │   ├── attendance.model.ts
│       │   ├── assignment.model.ts
│       │   ├── submission.model.ts
│       │   ├── language.material.model.ts
│       │   ├── announcement.model.ts
│       │   ├── language.announcement.model.ts
│       │   ├── contact.model.ts
│       │   ├── trialRequest.model.ts
│       │   ├── skillTrainingDetail.model.ts
│       │   └── item.model.ts
│       │
│       ├── routes/                       # 11 route files
│       ├── middlewares/                  # JWT auth guard, role authorization, file upload
│       ├── dtos/                         # Request validation (class-validator)
│       ├── services/                     # Google Calendar integration
│       ├── utils/                        # Email service (21KB — OTP, welcome, confirmations)
│       └── types/                        # TypeScript declarations
│
├── Frontend/sprachweg/
│   ├── package.json
│   ├── vite.config.ts                    # Vite + React + TailwindCSS plugins
│   ├── firebase.json                     # Firebase Hosting (SPA rewrites)
│   ├── index.html
│   └── src/
│       ├── main.tsx                      # React root
│       ├── App.tsx                       # Provider stack + 33+ routes
│       │
│       ├── context/
│       │   ├── AuthContext.tsx            # Full auth state + localStorage persistence
│       │   └── ThemeContext.tsx           # Dark/Light toggle
│       │
│       ├── components/
│       │   ├── layout/                   # Header (46KB mega-nav), Footer, ScrollToTop
│       │   ├── ui/                       # Button, BookingForm, EnrollmentModal, UnifiedBookingForm
│       │   ├── auth/                     # ProfileCompletionModal
│       │   └── admin/                    # Admin-specific components
│       │
│       ├── pages/
│       │   ├── LandingPage.tsx           # 49KB — hero, catalog, testimonials
│       │   ├── About.tsx                 # 37KB — company info
│       │   ├── ContactPage.tsx           # 47KB — contact form
│       │   ├── LoginPage.tsx             # Google OAuth + email login
│       │   ├── RegisterPage.tsx          # With OTP verification step
│       │   ├── StudentDashboard.tsx
│       │   ├── TrainerDashboard.tsx
│       │   ├── LanguageBatchDetails.tsx  # 73KB — largest page
│       │   ├── Admin/                    # 9 admin pages
│       │   │   ├── AdminDashboard.tsx
│       │   │   ├── SkillDashboard.tsx    # 76KB
│       │   │   ├── LanguageDashboard.tsx
│       │   │   ├── LanguageBatches.tsx
│       │   │   ├── ManageTrainers.tsx
│       │   │   └── ...
│       │   └── skill_training/           # 6 skill training detail pages
│       │
│       ├── lib/
│       │   ├── api.ts                    # Axios instance + 6 typed API modules
│       │   ├── courseData.ts             # Static course catalog (14KB)
│       │   └── utils.ts
│       └── types/
│
└── .github/workflows/                   # CI/CD pipelines
```

</details>

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 14.x |
| npm | ≥ 6.x |
| MongoDB | Local instance or Atlas cluster |

---

### ⚡ Backend Setup

```bash
# 1. Navigate to backend
cd SprachWeg/Backend

# 2. Install dependencies
npm install

# 3. Create environment file (see Environment Variables section below)
cp .env.example .env

# 4. Start development server (with hot-reload)
npm run dev

# 5. Or build for production
npm run build && npm start
```

### ⚡ Frontend Setup

```bash
# 1. Navigate to frontend
cd SprachWeg/Frontend/sprachweg

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start Vite dev server
npm run dev

# 5. Build for production
npm run build

# 6. Deploy to Firebase
firebase deploy --only hosting
```

---

<details>
<summary><h2>🔧 Environment Variables</h2></summary>

### Backend (`Backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/sprachweg` |
| `NODE_ENV` | Environment mode | `development` |
| `JWT_SECRET` | Secret key for JWT signing | — |
| `JWT_EXPIRE` | Token expiry duration | `30d` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | SMTP sender email | — |
| `EMAIL_PASS` | SMTP password / App Password | — |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | — |

### Frontend (`Frontend/sprachweg/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | — |

</details>

---

<details>
<summary><h2>📡 API Routes</h2></summary>

| Route Group | Base Path | Methods | Description |
|---|---|---|---|
| **Auth** | `/api/auth` | POST, GET, PUT | Register · Login · OTP verify/resend · Forgot/Reset password · Google OAuth · Profile |
| **Skills** | `/api/skills` | GET, POST, PUT, DELETE | Skill course CRUD (admin-protected writes) |
| **Languages** | `/api/languages` | GET, POST, PUT, DELETE | Language course CRUD |
| **Language Training** | `/api/language-training` | POST, GET | Language enrollment workflows |
| **Language Trainer** | `/api/language-trainer` | POST, GET, PUT, DELETE | Batch, class, attendance, assignment, material, announcement management |
| **Dashboard** | `/api/dashboard` | GET | Student and Trainer data aggregation |
| **Enrollment** | `/api/enrollment` | POST, GET | Enroll · Accept · Reject · Get pending |
| **Skill Details** | `/api/skill-training-details` | GET, POST | Extended skill course information |
| **Contact** | `/api/contact` | POST, GET | Contact form submission & retrieval |
| **Trial Requests** | `/api/trial-requests` | POST, GET | Booking & trial request handling |
| **Uploads** | `/api/uploads` | GET (static) | Serve uploaded files |

</details>

---

## 🔑 Role-Based Access Control

| | Public | Student | Trainer | Admin |
|:---:|:---:|:---:|:---:|:---:|
| Landing · About · Contact | ✅ | ✅ | ✅ | ✅ |
| Course Pages (Language + Skill) | ✅ | ✅ | ✅ | ✅ |
| Privacy Policy · Terms | ✅ | ✅ | ✅ | ✅ |
| Student Dashboard | ❌ | ✅ | ❌ | ✅ |
| Batch Details | ❌ | ✅ | ✅ | ✅ |
| Trainer Dashboard | ❌ | ❌ | ✅ | ✅ |
| Batch · Class · Attendance Mgmt | ❌ | ❌ | ✅ | ✅ |
| Admin Dashboard | ❌ | ❌ | ❌ | ✅ |
| Course CRUD | ❌ | ❌ | ❌ | ✅ |
| Enrollment Approval | ❌ | ❌ | ❌ | ✅ |
| Trainer Management | ❌ | ❌ | ❌ | ✅ |
| Contact Messages · Booking Requests | ❌ | ❌ | ❌ | ✅ |

---

<details>
<summary><h2>🗄️ Database Schema (19 Models)</h2></summary>

| Domain | Models | Description |
|---|---|---|
| **User & Auth** | `User` | Roles (student/trainer/admin), OTP, Google ID, profile completion virtual |
| **Course Catalog** | `SkillCourse` · `LanguageCourse` · `SkillTrainingDetail` | Multi-level courses with pricing, features, exam prep |
| **Enrollment** | `Enrollment` · `LanguageEnrollment` | Status-tracked enrollment pipelines |
| **Batches** | `Batch` · `LanguageBatch` | Grouped student cohorts |
| **Classes** | `ClassSession` · `LanguageClass` · `Attendance` | Scheduled sessions with attendance tracking |
| **Content** | `Assignment` · `Submission` · `LanguageMaterial` | Learning materials and student submissions |
| **Communication** | `Announcement` · `LanguageAnnouncement` | Broadcast messaging per batch |
| **Contact & Trials** | `Contact` · `TrialRequest` · `Item` | Public form submissions |

</details>

---

<details>
<summary><h2>💡 Key Design Decisions</h2></summary>

| Decision | Rationale |
|---|---|
| **Separate Skill vs Language models** | Different data structures — skills have categories, pricing tiers, and modes; languages have multi-level progressions with exam prep |
| **OTP-based email verification** | More secure than click-through links; prevents bot and fake registrations |
| **Dual auth (Email + Google OAuth)** | Reduces friction for Google users while maintaining traditional auth |
| **Virtual `isProfileComplete`** | Backend computes completeness; frontend enforces modal — clean separation of concerns |
| **Firebase Hosting** | Free tier, global CDN, automatic HTTPS, native SPA rewrite support |
| **Multer for uploads** | Server-side storage for course images and learning materials |
| **class-validator DTOs** | Type-safe, decorator-based request validation at the controller boundary |
| **Helmet middleware** | Automatic security headers with zero configuration overhead |
| **TailwindCSS 4 + Framer Motion** | Utility-first CSS for rapid development + production-grade animations |

</details>

---

## 📊 By the Numbers

<p align="center">

| 19 | 13 | 14 | 33+ |
|:---:|:---:|:---:|:---:|
| Database Models | Controllers | API Route Mounts | Frontend Pages |

| 3 | 3 | 5 | 11 |
|:---:|:---:|:---:|:---:|
| User Roles | Languages | Skill Domains | Components |

</p>

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

```bash
# 1. Fork & clone
git clone https://github.com/Akash-Shenvi/SprachWeg.git

# 2. Create a feature branch
git checkout -b feature/your-amazing-feature

# 3. Make your changes & commit
git commit -m "feat: add your amazing feature"

# 4. Push & open a PR
git push origin feature/your-amazing-feature
```

> **Commit Convention:** We follow [Conventional Commits](https://www.conventionalcommits.org/) — prefix with `feat:`, `fix:`, `docs:`, `refactor:`, etc.

---

## 📄 License

This project is proprietary software owned by **SoVir Technologies**.  
All rights reserved. Unauthorized reproduction or distribution is prohibited.

---

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Built_with-❤️-FF6B6B?style=for-the-badge&labelColor=0F172A" />
</p>

<p align="center">
  <strong>SprachWeg</strong> — Crafted by <a href="https://github.com/Akash-Shenvi"><strong>Akash Shenvi</strong></a> at <strong>SoVir Technologies</strong>
</p>

<p align="center">
  <a href="https://training.sovirtechnologies.in">🌐 Live Site</a> &nbsp;·&nbsp;
  <a href="https://github.com/Akash-Shenvi/SprachWeg">📦 Repository</a> &nbsp;·&nbsp;
  <a href="https://github.com/Akash-Shenvi/SprachWeg/issues">🐛 Report Bug</a> &nbsp;·&nbsp;
  <a href="https://github.com/Akash-Shenvi/SprachWeg/issues">💡 Request Feature</a>
</p>

<p align="center">
  <sub>If this project helped you, consider giving it a ⭐ — it means a lot!</sub>
</p>
