import React from "react";
import ClassRecommendations from "../components/ClassRecommendations";

const RecommendationsPage = () => {
  const userId = "user-id-here"; // Replace with actual user ID
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Class Recommendations</h1>
        <ClassRecommendations userId={userId} />
      </div>
    </div>
  );
};

export default RecommendationsPage;