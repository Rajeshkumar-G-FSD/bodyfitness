import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackDisplay from "../components/FeedbackDisplay";
import { useParams } from "react-router-dom";

const FeedbackPage = () => {
  const { trainerId } = useParams(); // Get trainerId from URL
  const userId = "user-id-here"; // Replace with actual user ID (from AuthContext)

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Trainer Feedback</h1>
        <FeedbackForm trainerId={trainerId} userId={userId} />
        <FeedbackDisplay trainerId={trainerId} />
      </div>
    </div>
  );
};

export default FeedbackPage;