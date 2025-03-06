import React, { useState } from "react";
import { submitReview } from "../services/api"; // Import the function

const TrainerFeedbackForm = ({ trainerId }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitReview(trainerId, formData); // Use the function
      alert("Review submitted successfully!");
      console.log(response);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: e.target.value })
          }
        />
      </label>
      <label>
        Comment:
        <textarea
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default TrainerFeedbackForm;