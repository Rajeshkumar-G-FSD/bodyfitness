import React, { useState } from "react";
import { submitTrainerReview } from "../services/api";

const TrainerReviewForm = ({ trainerId }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitTrainerReview(trainerId, formData);
      alert("Review submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default TrainerReviewForm;