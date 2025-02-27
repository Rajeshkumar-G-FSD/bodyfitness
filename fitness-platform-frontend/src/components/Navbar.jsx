import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Fitness Platform
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/classes"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Class Scheduling
            </Link>
          </li>
          <li>
            <Link
              to="/trainers"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Trainer Profiles
            </Link>
          </li>
          <li>
            <Link
              to="/bookings"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Booking Management
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Class Recommendations
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Trainer Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;