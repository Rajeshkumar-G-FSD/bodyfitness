import React, { useState } from "react";
import { submitFeedback } from "../services/api";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    trainerId: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitFeedback(formData);
      alert("Feedback submitted!");
      console.log(response.data);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Trainer ID</label>
          <input
            type="text"
            value={formData.trainerId}
            onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-white text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;