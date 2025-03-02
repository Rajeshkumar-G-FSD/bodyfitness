import React, { useContext } from "react";
// Home.jsx
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Fitness Platform</h1>
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Fitness Goals: {user.fitnessGoals}</p>
            <p className="text-gray-700">Preferences: {user.preferences}</p>
          </div>
        ) : (
          <p className="text-white">Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Home;