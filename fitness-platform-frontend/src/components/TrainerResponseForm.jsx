import React, { useState } from "react";
import { respondToFeedback } from "../services/api";

const TrainerResponseForm = ({ feedbackId }) => {
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await respondToFeedback(feedbackId, { response });
      alert("Response submitted successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Failed to submit response:", error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your response..."
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
};

export default TrainerResponseForm;