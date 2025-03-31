# Node.js User Profile Management API

This is a **RESTful API** built with **Node.js, Express, MongoDB**, and **JWT authentication** for user profile management. Users can register, authenticate, and update their profiles, including uploading profile pictures via **Multer** and storing them on **Cloudinary**.

## Features

- **User Authentication** (Signup, Signin) with JWT tokens
- **Profile Management** (Retrieve & Update Profile)
- **Profile Picture Upload** with Cloudinary
- **Secure Route Protection**
- **Input Validation & Error Handling**

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Multer, Cloudinary
- **Security:** bcrypt, cookie-parser, cors
- **Error Handling:** Custom middleware

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/ShaswataG/binbag-backend-assignment.git
cd your-repo-name
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the project root and add:
```env
PORT=5000
HOST=http://localhost:8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4️⃣ Start the Server**
#### Development Mode (nodemon)
```sh
node server.js
```
#### Production Mode
```sh
node server.js
```

---

## 📡 API Endpoints

### **Auth Routes** (`/api/auth`)
| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | `/signup` | Register a new user |
| POST   | `/signin` | Authenticate user & get JWT |
| POST   | `/logout` | Logout user

### **User Routes** (`/api/user`)
| Method | Endpoint   | Description |
|--------|-----------|-------------|
| GET    | `/profile` | Get user profile (Protected) |
| PUT    | `/profile` | Update user profile (Protected, Supports Image Upload) |

---

## 📌 Folder Structure
```plaintext
.
├── config/             # Configuration files (Cloudinary etc.)
├── controllers/        # Business logic for routes
├── middlewares/        # Custom middlewares (Auth, Upload, Error Handling)
├── models/            # Mongoose Schemas
├── routes/            # Express route definitions
├── utils/             # Utility functions
├── helpers/          # Helper functions (Mail etc)
├── server.js         # Main entry point
├── .env              # Example environment variables
└── README.md         # Project documentation
```

---

## 📝 Notes
- **Only authenticated users** can access profile-related routes.
- **Profile pictures** are stored on Cloudinary; previous images are deleted before uploading a new one.
- **JWT tokens** are stored in HTTP-only cookies for better security.

---

## 📧 Contact
For any queries, reach out to: **gshaswata1@gmail.com**