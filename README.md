# SmartForms Pro - AI-Powered Form Generator

> An AI-driven form builder that lets users create, share, and manage smart forms powered by **Google Gemini AI**.

**Live Demo:** [https://ai-based-form-generator-jlv7.vercel.app](https://ai-based-form-generator-jlv7.vercel.app)

**GitHub:** [https://github.com/Mayankkamriya/AI-Based-Form-Generator](https://github.com/Mayankkamriya/AI-Based-Form-Generator)

---

## 🚀 Overview

**SmartForms Pro** uses AI to generate dynamic forms from plain text prompts. Users can build forms, collect responses, upload files, and track submissions — all through a clean dashboard interface.

---

## ✨ Features

* **User Authentication:** Secure login/signup with JWT
* **AI Form Generation:** Google Gemini API creates forms from natural language
* **Dynamic Rendering:** Real-time validation and responsive layouts
* **Submission Tracking:** Stores responses with timestamps in MongoDB
* **File Uploads:** Cloudinary integration for secure file storage
* **Dashboard:** Manage forms, view submissions, and share public links

---

## 🛠️ Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, React Hook Form, Axios

**Backend:** Express 5, TypeScript, MongoDB, JWT, bcryptjs

**AI & Storage:** Google Gemini API, Cloudinary

**Database:** MongoDB Atlas

---

## 📁 Folder Structure

```
smartforms-pro/
├── frontend/               # Next.js frontend application
│   ├── app/
│   │   ├── (auth)/        # Authentication pages
│   │   ├── dashboard/     # Protected dashboard routes
│   │   └── utils/         # API client and utilities
│   ├── public/            # Static assets
│   └── README.md          # Frontend documentation
│
├── backend/               # Express backend API
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # AI and file upload utilities
│   └── README.md         # Backend documentation
│
└── README.md             # This file
```

---

## ⚡ Quick Start

### Prerequisites

* Node.js 18+
* MongoDB Atlas
* Google Gemini API key
* Cloudinary account

### Setup

```bash
git clone https://github.com/Mayankkamriya/AI-Based-Form-Generator.git
cd smartforms-pro
```

#### Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
PORT=5000
```

Run server:

```bash
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Access:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)

---

## 🔐 API Endpoints

| Endpoint                  | Method | Description           |
| ------------------------- | ------ | --------------------- |
| `/api/auth/signup`        | POST   | Register new user     |
| `/api/auth/login`         | POST   | Login user            |
| `/api/form/generate`      | POST   | Generate form with AI |
| `/api/form/:id`           | GET    | Get form by ID        |
| `/api/submission/:formId` | POST   | Submit form response  |
| `/api/submission/:formId` | GET    | Get form submissions  |

---

## 🌐 Deployment (Vercel)

The project is fully deployed on **Vercel** for production:

* **Frontend:** Next.js app
* **Backend:** Express API hosted separately
* **Environment Variables:** Configured in Vercel dashboard

Example `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

---

### Example Test Prompts

1. **Simple Form**:
   ```
   "Create a newsletter signup form with email and name"
   ```

2. **Complex Form**:
   ```
   "Create an event registration form with full name, email, phone, 
   number of attendees (1-10), dietary requirements (textarea), and 
   photo ID upload"
   ```

3. **E-commerce Form**:
   ```
   "Create a product inquiry form with product name, quantity (number), 
   customer email, message, and product image upload"
   ```
---

## 🙏 Acknowledgments

* **Google Gemini AI** – Form schema generation
* **Cloudinary** – File storage
* **MongoDB Atlas** – Database hosting

---

**Built with ❤️ using Next.js, Express, TypeScript & Google Gemini AI**
*Last Updated: October 15, 2025*