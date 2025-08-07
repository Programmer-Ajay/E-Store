# 🛍️ E-store - An eCommerce App

**E-store** is a full-featured, responsive eCommerce application built with **React**, **Redux Toolkit And RTK Query**, **Node.js**, and **MongoDB**. It allows users to browse products, add to cart, make secure payments, and manage orders — while providing admin controls for managing inventory, orders, and users.

---

##  Demo & 

> **Live Demo**: [Coming Soon]
---

## 🚀 Features

- 🧑‍💼 User authentication with JWT & Google login
- 📦 Product listing, details, and filtering
- 🔍 Advanced search with category & keyword filters
- 🛒 Shopping cart & wishlist/favorites
- 💳 Payment gateway integration (Razorpay)
- 📁 Product image uploads with Cloudinary
- 📊 Admin dashboard for product, order, and user management
- 📱 Responsive UI with Tailwind CSS
- 🔁 Lazy image loading and pagination
- 🌐 MongoDB Atlas Full Text Search

---

## 🧱 Tech Stack

### Frontend:
- React
- Redux Toolkit & RTK Query
- React Router
- Tailwind CSS
- Toastify

### Backend:
- Node.js
- Express
- MongoDB with Mongoose
- Cloudinary
- Razorpay
- JWT Authentication
- Multer (for image handling)

---

## 📁 Folder Structure

E-store/
│
├── frontend/ # React app
├── backend/ # Node.js + Express API
├── README.md
└── .gitignore

yaml
Copy code

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/e-store.git
cd e-store
2. Install dependencies
bash
Copy code
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
3. Set up environment variables
🔐 Create .env in /backend:
env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
(Optional) Create .env in /frontend if needed:
env
Copy code
VITE_API_URL=http://localhost:5000/api
4. Run the app
bash
Copy code
# Start backend (in one terminal)
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
The app will be running at:

Frontend: http://localhost:5173/

Backend: http://localhost:5000/



📬 API Documentation
API routes are organized under:

bash
Copy code
/api/users
/api/products
/api/orders
Each route supports CRUD operations secured via auth middleware.

🙌 Contribution Guide
Fork the repository

Create your feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature-name

Create a Pull Request


💬 Acknowledgements
Cloudinary

Razorpay

MongoDB Atlas

Tailwind CSS
