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

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<BookingManagement />} />
          <Route path="/recommendations" element={<ClassRecommendations />} />
          <Route path="/feedback" element={<TrainerFeedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;