import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trainers from "./pages/Trainers";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";
import BookingManagement from "./pages/BookingManagement";
import ClassRecommendations from "./pages/ClassRecommendations";
import TrainerFeedback from "./pages/TrainerFeedback";
import UserBookingsPage from "./pages/UserBookingsPage";
import TrainerBookingsPage from "./pages/TrainerBookingsPage";
import TrainerProfile from "./components/TrainerProfile";
import UserDashboard from "./pages/UserDashboard"; // Ensure this matches the file name

function App() {
  return (
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
          <Route path="/feedback" element={<TrainerFeedback />} />

          {/* User Bookings Page */}
          <Route path="/user-bookings" element={<UserBookingsPage />} />

          {/* Trainer Bookings Page */}
          <Route path="/trainer-bookings" element={<TrainerBookingsPage />} />

          {/* User Dashboard Page */}
          <Route path="/dashboard" element={<UserDashboard userId="user-id-here" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;