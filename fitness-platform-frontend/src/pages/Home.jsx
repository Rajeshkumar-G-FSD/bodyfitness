import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import backgroundImage from "../assets/workout.jpg";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use the imported image
    >
      <div className="container mx-auto p-4">
        {/* Header and Navigation */}
        <h1 className="text-4xl font-bold text-white mb-8">RAPIDERT</h1>
        <nav className="mb-8">
          <ul className="flex space-x-6">
            <li><a href="/" className="text-white hover:text-gray-200">Home</a></li>
            <li><a href="/about" className="text-white hover:text-gray-200">About Us</a></li>
          </ul>
        </nav>

        {/* Motivational Message */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold text-white mb-4">Every Day Is A Chance To</h2>
          <h3 className="text-5xl font-bold text-white">Become Better</h3>
        </div>

        {/* User-Specific Content */}
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Fitness Goals: {user.fitnessGoals}</p>
            <p className="text-gray-700">Preferences: {user.preferences}</p>
          </div>
        ) : (
          <p className="text-white text-center">Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Home;