import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Trainers from "./pages/Trainers";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";
import BookingManagement from "./pages/BookingManagement";
import ClassRecommendations from "./pages/ClassRecommendations";
import TrainerFeedbackPage from "./pages/TrainerFeedbackPage"; // Import the new page
import UserBookingsPage from "./pages/UserBookingsPage";
import TrainerBookingsPage from "./pages/TrainerBookingsPage";
import TrainerProfile from "./components/TrainerProfile";
import UserDashboard from "./pages/UserDashboard";

import Register from "./components/Register";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";

import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Trainers Page */}
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:trainerId" element={<TrainerProfile />} />

          {/* Classes Page */}
          <Route path="/classes" element={<Classes />} />

          {/* Profile Page */}
          <Route path="/profile" element={<Profile />} />

          {/* Booking Management Page */}
          <Route path="/bookings" element={<BookingManagement />} />

          {/* Class Recommendations Page */}
          <Route path="/recommendations" element={<ClassRecommendations />} />

          {/* Trainer Feedback Page */}
          <Route path="/feedback" element={<TrainerFeedbackPage />} />

          {/* User Bookings Page */}
          <Route path="/user-bookings" element={<UserBookingsPage />} />

          {/* Trainer Bookings Page */}
          <Route path="/trainer-bookings" element={<TrainerBookingsPage />} />

          {/* User Dashboard Page */}
          <Route path="/dashboard" element={<UserDashboard userId="user-id-here" />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Register Page */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
      </AuthProvider>
  );
}

export default App;