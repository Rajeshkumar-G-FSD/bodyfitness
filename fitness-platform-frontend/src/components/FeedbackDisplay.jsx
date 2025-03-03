import React, { useEffect, useState } from "react";
import { getTrainerFeedback } from "../services/api";

const FeedbackDisplay = ({ trainerId }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getTrainerFeedback(trainerId);
        setFeedback(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [trainerId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Trainer Feedback</h2>
      {feedback.length > 0 ? (
        feedback.map((fb) => (
          <div key={fb._id} className="border p-4 rounded-lg mb-4">
            <p className="text-gray-600">
              <strong>{fb.userId.name}</strong> rated {fb.rating}/5
            </p>
            <p className="text-gray-600">{fb.comment}</p>
            {fb.trainerResponse && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="text-gray-800">
                  <strong>Trainer's Response:</strong> {fb.trainerResponse}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No feedback found.</p>
      )}
    </div>
  );
};

export default FeedbackDisplay;