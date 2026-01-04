# 📝 QuickBlog – AI Powered Blog Platform

QuickBlog is a **full-stack MERN blog application** powered by **AI-generated content**.  
It allows admins to create and publish blogs effortlessly while users can explore blogs by category.

---

## 🚀 Features
🌓 Light & Dark theme toggle.
🧩 Modular and reusable React components (Navbar, Header, BlogCard, etc.).
📱 Fully responsive UI for desktop, tablet, and mobile.
🎨 Styled with Tailwind CSS for a modern look.
⚡ Smooth navigation and dynamic rendering of blogs from backend.
📂 File structure optimized for maintainability.
🔐 Admin dashboard with CRUD operations for blogs and comments.
🤖 AI-powered blog generation: Admin can enter a topic, make a few decisions, and automatically generate blog content.
📝 Blog publishing: Admin can easily post or publish blogs after generation.
📂 Categorized browsing: Viewers can filter blogs based on categories for a personalized reading experience.
💻 Full-stack MERN: React (frontend), Node.js + Express (backend), and MongoDB (database).
🚀 Modern development setup: Vite for fast frontend development.

---

## 🧰 Tech Stack Used
React 19 + Vite – Frontend framework and bundler
Node.js + Express – Backend API server
MongoDB – Database for blogs and comments
Tailwind CSS v4 – Utility-first styling
JavaScript (ES6+) – Logic and interactivity
REST APIs – Backend communication
AI Integration: Generates blog content automatically, AI integration setup is currently delayed because Google Cloud requires linking a billing account with a ₹1000 pre-authorization hold, which needs to be processed before API keys can be generated.

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](screenshots/screenshot-1.png)

### 📝 Blog Listing
![Blog Listing](screenshots/screenshot-2.png)

### ✍️ Blog Details
![Blog Details](screenshots/screenshot-3.png)

### 🔐 Admin Login
![Admin Login](screenshots/screenshot-4.png)

### ✍️ Admin Editor
![Admin Editor](screenshots/screenshot-5.png)

### 📋 Admin Dashboard
![Admin Dashboard](screenshots/screenshot-6.png)

### 📂 Category View
![Category View](screenshots/screenshot-7.png)

### ⚙️ Settings / Other
![Other](screenshots/screenshot-8.png)

---
## 📂 Project Directory Structure
quick-blog/
├── client/
│ ├── public/
│ │ └── favicon.svg
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── admin/
│ │ │ ├── BlogCard.jsx
│ │ │ ├── BlogList.jsx
│ │ │ └── ...
│ │ ├── context/
│ │ ├── pages/
│ │ │ ├── admin/
│ │ │ └── ...
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── package.json
│ └── README.md
├── server/
│ ├── configs/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── package.json
│ └── server.js
├── README.md


### 1️⃣ Clone Repository
```bash
git clone https://github.com/Nikita7704/QuickBlog.git
cd QuickBlog

