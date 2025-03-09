# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Fitness Platform
Overview
The Fitness Platform is a full-stack web application designed to help users manage their fitness journey. It includes features such as class booking, trainer management, feedback submission, and payment processing. The platform is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and integrates with Stripe for payment processing.

Features
User Authentication: Register, login, and manage user profiles.

Class Management: Browse, book, reschedule, and cancel fitness classes.

Trainer Management: View trainer profiles, submit reviews, and manage availability.

Feedback System: Submit feedback for trainers and view responses.

Payment Integration: Securely pay for classes using Stripe.

Dashboard: View upcoming classes, booking history, and class recommendations.

Technologies Used
Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Payment Processing: Stripe

Deployment: Render (Backend), Netlify (Frontend)

Setup Instructions
Prerequisites
Node.js (v16 or higher)

MongoDB (local or cloud-based)

Stripe API keys

Backend Setup
Clone the repository:

bash
 
git clone https://github.com/your-username/fitness-platform.git
cd fitness-platform/backend
Install dependencies:

bash
 
npm install
Set up environment variables:
Create a .env file in the backend directory and add the following variables:

env
 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
Run the backend server:

bash
 
npm start
Frontend Setup
Navigate to the frontend directory:

bash
 
cd ../frontend
Install dependencies:

bash
 
npm install
Set up environment variables:
Create a .env file in the frontend directory and add the following variables:

env
 
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
Run the frontend application:

bash
 
npm start
Database Setup
MongoDB: Ensure you have a MongoDB instance running. You can use a local instance or a cloud-based service like MongoDB Atlas.

Collections: The application will automatically create the necessary collections (users, trainers, classes, bookings, feedback, etc.) when you start using the platform.

API Documentation
Authentication
Register a new user:

POST /api/auth/register

Request Body:

json
 
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "fitnessGoals": "Lose weight",
  "preferences": "Yoga, Cardio"
}
Login:

POST /api/auth/login

Request Body:

json
 
{
  "email": "john.doe@example.com",
  "password": "password123"
}
Class Management
Fetch all classes:

GET /api/classes

Book a class:

POST /api/bookings

Request Body:

json
 
{
  "userId": "64f1b2c8e4b0d1a2b3c4d5e8",
  "classId": "64f1b2c8e4b0d1a2b3c4d5e7",
  "date": "2023-10-15",
  "time": "10:00 AM"
}
Trainer Management
Fetch all trainers:

GET /api/trainers

Create a new trainer:

POST /api/trainers

Request Body:

json
 
{
  "name": "Jane Doe",
  "specialization": "Yoga",
  "bio": "Certified yoga instructor with 10 years of experience.",
  "photo": "https://example.com/jane-doe.jpg",
  "video": "https://example.com/jane-doe-intro.mp4",
  "qualifications": ["RYT 500", "Yoga Therapy Certification"],
  "expertise": ["Hatha Yoga", "Vinyasa Flow"],
  "availableSlots": ["10:00 AM", "02:00 PM"]
}
Feedback System
Submit feedback:

POST /api/feedback

Request Body:

json
 
{
  "trainerId": "64f1b2c8e4b0d1a2b3c4d5e6",
  "userId": "64f1b2c8e4b0d1a2b3c4d5e8",
  "rating": 5,
  "comment": "Great trainer!"
}
Payment Integration
Create a payment intent:

POST /api/payment/create-payment-intent

Request Body:

json
 
{
  "amount": 1000,
  "currency": "usd"
}
Deployment
Backend
The backend is deployed on Render. You can deploy your own instance by following these steps:

Create a new Web Service on Render.

Connect your GitHub repository.

Set the environment variables in the Render dashboard.

Deploy the service.

Frontend
The frontend is deployed on Netlify. You can deploy your own instance by following these steps:

Create a new site on Netlify.

Connect your GitHub repository.

Set the environment variables in the Netlify dashboard.

Deploy the site.

