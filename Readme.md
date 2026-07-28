# 🚀 SkillNova

> The Future of AI-Powered Learning.

SkillNova is a modern AI-powered learning platform built using the MERN Stack. It combines educational videos, intelligent recommendations, creator tools, and AI features into one seamless learning ecosystem.

Unlike traditional video-sharing platforms, SkillNova is designed to become a complete learning companion where users can watch courses, upload educational content, receive AI-generated summaries, solve quizzes, and follow personalized learning roadmaps.

---

## ✨ Vision

Our mission is to make high-quality education accessible, intelligent, and interactive.

SkillNova aims to transform passive video watching into an active learning experience using Artificial Intelligence.

---

# 🚀 Features

## Authentication

- User Registration
- Secure Login
- Logout
- JWT Authentication
- Refresh Tokens
- HTTP-only Cookies
- Persistent Login
- Password Hashing

---

## User Features

- Update Profile
- Upload Avatar
- Upload Cover Image
- Channel Profile
- Watch History

---

## Video Features

- Upload Videos
- Upload Thumbnails
- Cloudinary Integration
- Creator Dashboard
- Video Management
- Publish Videos

---

## Frontend

- Responsive UI
- Modern Dashboard
- Sidebar Navigation
- Search
- Hero Banner
- Trending Videos
- Continue Learning
- AI Recommendation Section

---

## AI Features (Upcoming)

- AI Tutor
- AI Chat
- AI Video Summarizer
- Quiz Generator
- Smart Search
- Personalized Recommendations
- Automatic Notes
- Coding Assistant
- Learning Roadmaps
- Resume Builder
- Interview Preparation

---

# 🛠 Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- Refresh Tokens
- HTTP-only Cookies
- bcrypt

### Storage

- Cloudinary
- Multer

---

# Folder Structure

```
SkillNova
│
├── backend
│
├── frontend
│
├── README.md
│
└── package.json
```

---

# Installation

## Clone

```bash
git clone https://github.com/deep453/skillnova.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

```env
PORT=

MONGODB_URI=

CORS_ORIGIN=

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=

REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

# API

## Authentication

```
POST /api/v1/users/register

POST /api/v1/users/login

POST /api/v1/users/logout

POST /api/v1/users/refresh-token

GET /api/v1/users/current-user
```

---

## Videos

```
POST /api/v1/videos/upload

GET /api/v1/videos
```

---

# Future Roadmap

- Likes
- Comments
- Playlists
- Subscriptions
- Notifications
- AI Tutor
- AI Quiz
- AI Notes
- AI Interview Practice
- AI Coding Mentor
- Live Streaming
- Creator Analytics
- Mobile Application

---

# Author

Deep Ranjan Kumar

GitHub

https://github.com/deep453

---

⭐ If you like SkillNova, consider giving this repository a star.
