import React from "react";
import FeedbackForm from "../components/FeedbackForm";

const TrainerFeedbackPage = () => {
  const trainerId = "64f1b2c3e4b0f5a2d8e7f8a9"; // Replace with actual trainer ID
  const userId = "64f1b2c3e4b0f5a2d8e7f8b0"; // Replace with actual user ID

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Trainer Feedback</h1>
        <FeedbackForm trainerId={trainerId} userId={userId} />
      </div>
    </div>
  );
};

export default TrainerFeedbackPage;