# Lead Management System

A full-stack Lead Management System built with the MERN stack that allows organizations to manage leads efficiently. The application supports authentication, role-based access control, lead management, notes, activity tracking, search, pagination, and testing of core backend flows.

## 🚀 Live Demo

- **Frontend:** https://lead-management-app-orpin.vercel.app/
- **Backend API:** https://lead-management-app-l88n.onrender.com

---

## 📌 Features

### Authentication
- User Registration
- User Login with JWT Authentication
- Protected Routes
- Secure Password Hashing using bcrypt
- Role-Based Authorization (Admin & Member)

### Lead Management
- Create Lead
- View All Leads
- Update Lead
- Delete Lead
- Lead Details Page
- Update Lead Status

### Notes & Activity
- Add Notes to Leads
- Track Lead Updates

### Search & Pagination
- Search Leads by Name or Email
- Server-side Pagination

### UI
- Responsive Design
- Tailwind CSS
- Toast Notifications
- Loading Indicators
- Confirmation Modal

### Testing
- User Login Flow
- Lead Creation Flow
- Jest & Supertest

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- JWT Decode

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Express Validator
- CORS

## Testing

- Jest
- Supertest

---

# 📁 Project Structure

```
lead-management-app
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   └── package.json
│
├── backend
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── tests
│   ├── utils
│   ├── app.js
│   ├── server.js
│   ├── jest.config.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/lead-management-app.git
```

```bash
cd lead-management-app
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=4000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

```

Start backend

```bash
npm run dev
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:4000/api
```

Run frontend

```bash
npm run dev
```

Application runs on

```
http://localhost:5173
```

---


# Testing

Run backend tests

```bash
cd backend

npm test
```

### Tested Core Flows

- User Login
- Create Lead

---




