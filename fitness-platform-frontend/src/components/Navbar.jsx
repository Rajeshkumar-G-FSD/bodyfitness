import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          Fitness Platform
        </NavLink>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors duration-300 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trainers"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors duration-300 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              Trainers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors duration-300 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              Classes
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition-colors duration-300 ${
                      isActive ? "font-bold underline" : ""
                    }`
                  }
                >
                  Booking Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recommendations"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition-colors duration-300 ${
                      isActive ? "font-bold underline" : ""
                    }`
                  }
                >
                  Class Recommendations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition-colors duration-300 ${
                      isActive ? "font-bold underline" : ""
                    }`
                  }
                >
                  Feedback
                </NavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition-colors duration-300 ${
                      isActive ? "font-bold underline" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `text-white hover:text-gray-200 transition-colors duration-300 ${
                      isActive ? "font-bold underline" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;