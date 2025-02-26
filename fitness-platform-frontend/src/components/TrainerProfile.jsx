import React, { useEffect, useState } from "react";
import { fetchTrainerProfile, fetchTrainerReviews } from "../services/api";

const TrainerProfile = ({ trainerId }) => {
  const [trainer, setTrainer] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchTrainerProfile(trainerId)
      .then((response) => setTrainer(response.data))
      .catch((error) => console.error(error));

    fetchTrainerReviews(trainerId)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error(error));
  }, [trainerId]);

  if (!trainer) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3">
          <img
            src={trainer.photo}
            alt={trainer.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{trainer.name}</h2>
          <p className="text-gray-600">{trainer.specialization}</p>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-bold mb-2">About Me</h3>
          <p className="text-gray-700">{trainer.bio}</p>
          <h3 className="text-xl font-bold mt-4 mb-2">Qualifications</h3>
          <ul className="list-disc list-inside text-gray-700">
            {trainer.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mt-4 mb-2">Expertise</h3>
          <ul className="list-disc list-inside text-gray-700">
            {trainer.expertise.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mt-4 mb-2">Introductory Video</h3>
          <video controls className="w-full rounded-lg">
            <source src={trainer.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">User Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg mb-4">
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                - {review.userName}, {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerProfile;