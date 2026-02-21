# 📝 QuickBlog – AI-Powered Blog Platform

QuickBlog is a **full-stack MERN blog application** powered by **AI-generated content**.  
It allows admins to create and publish blogs effortlessly while users can explore blogs by category.

---

## 🚀 Features

- 🌓 **Light & Dark theme** toggle
- 🧩 **Modular and reusable** React components (Navbar, Header, BlogCard, etc.)
- 📱 **Fully responsive** UI for desktop, tablet, and mobile
- 🎨 Styled with **Tailwind CSS** for a modern look
- ⚡ Smooth navigation and dynamic rendering of blogs from backend
- 📂 File structure optimized for maintainability
- 🔐 **Admin dashboard** with CRUD operations for blogs and comments
- 🤖 **AI-powered blog generation** – Admin can enter a topic, make a few decisions, and automatically generate blog content
- 📝 **Blog publishing** – Admin can easily post or publish blogs after generation
- 📂 **Categorized browsing** – Viewers can filter blogs by category for a personalized reading experience
- 💻 **Full-stack MERN** – React (frontend), Node.js + Express (backend), MongoDB (database)
- 🚀 **Modern dev setup** – Vite for fast frontend development

---

## 🧰 Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | React 19 + Vite                     |
| Backend      | Node.js + Express                   |
| Database     | MongoDB                             |
| Styling      | Tailwind CSS v4                     |
| Language     | JavaScript (ES6+)                   |
| API          | REST APIs                           |
| AI           | Content generation (setup pending*) |

\* *AI integration is currently delayed: Google Cloud requires linking a billing account with a ₹1000 pre-authorization hold before API keys can be generated.*

---

## 📸 Screenshots

| Page             | Preview |
| ---------------- | ------- |
| 🏠 Home          | ![Home Page](screenshots/screenshot-1.png) |
| 📝 Blog Listing  | ![Blog Listing](screenshots/screenshot-2.png) |
| ✍️ Blog Details  | ![Blog Details](screenshots/screenshot-3.png) |
| 🔐 Admin Login   | ![Admin Login](screenshots/screenshot-4.png) |
| ✍️ Admin Editor  | ![Admin Editor](screenshots/screenshot-5.png) |
| 📋 Admin Dashboard | ![Admin Dashboard](screenshots/screenshot-6.png) |
| 📂 Category View | ![Category View](screenshots/screenshot-7.png) |
| ⚙️ Settings      | ![Other](screenshots/screenshot-8.png) |

---

## 📂 Project Structure

```
QuickBlog/
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nikita7704/QuickBlog.git
cd QuickBlog
```

### 2. Install dependencies

```bash
# Install client dependencies
cd client && npm install

# Install server dependencies (from project root)
cd ../server && npm install
```

### 3. Run the application

Start the backend and frontend (see each folder’s `package.json` for scripts).  
Ensure MongoDB is running and environment variables are set as needed.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
