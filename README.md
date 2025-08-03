# 🧠 Memorie – A Personal Memory Board App

Memorie is a full-stack web application where users can upload and preserve their precious memories — in the form of images, audio notes, and descriptive text. Built with the MERN stack, this app allows OTP-based authentication, secure memory uploads, and a beautiful UI to view and relive each moment.

## 🚀 Features

- 🔐 **OTP-based User Registration & Login**  
- 🧾 **JWT Authentication & Protected Routes**
- 🖼️ **Upload Photos and Audio Memories (up to 100MB)**
- 🧠 **Memory Cards with Titles, Descriptions & Creation Time**
- 🧊 **Modern UI with Custom Audio Player**
- 💬 **Floating '+' Button to Create Memories Instantly**
- 🧱 **Responsive Masonry Layout for Memory Gallery**
- ☁️ **Cloudinary + Filebase Storage Support**

## 🧩 Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- React Router  
- Axios  
- Framer Motion (animations)

**Backend:**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT for authentication  
- Multer + Cloudinary (for file uploads)  
- Nodemailer (for sending OTPs)

## 🔐 Authentication Flow

1. User registers using email  
2. An OTP is sent via email (valid for 10 mins)  
3. Upon verification, JWT token is generated and stored securely  
4. Protected routes are accessible only with valid token

## 📸 Memory Upload Flow

- User can upload an image, audio note, and a small description  
- Files are stored securely using Cloudinary  
- Each memory is rendered as a responsive card with full details

## 📁 Folder Structure (Backend)

