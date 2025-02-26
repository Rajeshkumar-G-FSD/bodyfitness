import React from "react";
import FeedbackForm from "../components/FeedbackForm";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-500 to-orange-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Profile</h1>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Profile;