import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the user's login state
    navigate("/"); // Redirect to the Home page
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Fitness Platform
        </Link>
        <ul className="flex space-x-6">
          {/* Always show Home link */}
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>

          {/* Show these links only if the user is logged in */}
          {user ? (
            <>
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
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Show Login and Register links if the user is not logged in */}
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;