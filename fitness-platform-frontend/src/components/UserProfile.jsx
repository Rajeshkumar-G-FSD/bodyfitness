import React, { useState } from "react";
import { updateUserProfile } from "../services/api";

const UserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    fitnessGoals: user.fitnessGoals || "",
    preferences: user.preferences || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(user._id, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Fitness Goals</label>
          <textarea
            value={formData.fitnessGoals}
            onChange={(e) => setFormData({ ...formData, fitnessGoals: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Preferences</label>
          <input
            type="text"
            value={formData.preferences}
            onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;