# 🎓 InternConnect — Student Internship Portal

> A modern, responsive internship discovery platform for students. Built with React.js and Tailwind CSS, InternConnect mimics real-world job portals with a strong focus on UI/UX, smooth navigation, and realistic application workflows.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)

---

## 🔗 Live Demo

👉 **[intern-connect-lime.vercel.app](https://internconnecthub.vercel.app)**

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

**InternConnect** is a fully functional frontend internship portal designed for students to discover and apply for internship opportunities. The application simulates a complete job portal experience — from browsing listings and filtering by category or location, to tracking applications and managing authentication state.

The project prioritises clean component architecture, responsive design, and a polished user experience with dark/light mode support, glassmorphism UI elements, and local storage persistence.

---

## Features

- 🔍 **Smart Search & Filtering** — Filter internships instantly by category (Tech, Design, Marketing) and location (Pune, Mumbai, Remote)
- 📄 **Pagination System** — Clean job feed with 5 listings per page for improved readability
- 💼 **Detailed Internship View** — Dedicated pages per listing with stipend, duration, requirements, and perks
- 📝 **Application Tracking** — Personalised "My Applications" dashboard to track and withdraw applied internships
- 🌗 **Dark / Light Mode** — Full theme switcher with comfortable day and night variants
- 💾 **Local Storage Persistence** — Applied jobs and auth state persist across browser sessions
- 🔐 **Simulated Authentication** — Complete Login & Registration UI with protected route handling
- 🎨 **Premium UI/UX** — Glassmorphism cards, smooth animations, and polished hover interactions
- ⚡ **Vite Powered** — Fast development with instant Hot Module Replacement

---

## Tech Stack

| Technology | Usage |
|---|---|
| React.js (Vite) | Frontend framework and component architecture |
| Tailwind CSS | Utility-first styling and responsive layout |
| React Router DOM (HashRouter) | Client-side routing and protected routes |
| Lucide React | Icon library |
| Local Storage API | Persistent auth and application state |
| Vercel | Live deployment |

---

## Project Structure

```
intern-connect/
├── backend/               # Backend scaffolding (future integration)
├── public/
│   └── index.html
├── src/
│   ├── App.jsx            # Main app logic, routing, state management
│   ├── main.jsx           # React entry point
│   ├── index.css          # Tailwind imports & global styles
│   └── pages/             # Application pages and views
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/rohandeo2609/intern-connect.git

# 2. Navigate into the project
cd intern-connect

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Future Improvements

- [ ] **Backend Integration** — Connect to Node.js/Express & MongoDB for real database storage
- [ ] **Resume Upload** — Allow students to attach CVs during the application process
- [ ] **Recruiter Dashboard** — Separate admin view for companies to post and manage listings
- [ ] **Email Notifications** — Application status updates via email
- [ ] **Search by Keywords** — Full-text search across job titles and descriptions

---

## Author

**Rohan Deo**
B.Tech Computer Science Engineering · Pune, India
GitHub: [@rohandeo2609](https://github.com/rohandeo2609) · LinkedIn: [rohandeo4693](https://www.linkedin.com/in/rohandeo4693/)

---

> *Built to demonstrate React component architecture, state management, responsive UI design, and real-world application flow — all without a backend.*
