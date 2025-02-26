import React, { useEffect, useState } from "react";
import { fetchClassRecommendations } from "../services/api";

const ClassRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchClassRecommendations(userId)
      .then((response) => setRecommendations(response.data))
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Class Recommendations</h2>
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((cls) => (
            <div key={cls._id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{cls.name}</h3>
              <p className="text-gray-600">{cls.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {cls.date} at {cls.time}
              </p>
              <p className="font-semibold text-gray-700">Trainer: {cls.trainer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations found.</p>
      )}
    </div>
  );
};

export default ClassRecommendations;