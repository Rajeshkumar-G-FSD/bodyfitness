import React from "react";
import { recommendedClasses } from "../data/recommendedClasses";


const ClassRecommendations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Class Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2">{cls.name}</h3>
              <p className="text-gray-600 mb-4">{cls.description}</p>
              <div className="text-sm text-gray-500">
                <p>
                  <span className="font-semibold">Type:</span> {cls.type}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {cls.duration}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {cls.date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {cls.time}
                </p>
                <p>
                  <span className="font-semibold">Trainer:</span> {cls.trainer}
                </p>
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassRecommendations;