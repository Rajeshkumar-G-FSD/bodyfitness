import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrainerProfile = () => {
  const { trainerId } = useParams(); // Get the trainerId from the URL
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch trainer data from the backend
 
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(`https://renderbackend-1-gw0j.onrender.com/api/trainers/${trainerId}`);
        console.log(response)
        setTrainer(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!trainer) {
    return <div className="text-center mt-8">Trainer not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Trainer Profile</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Trainer Photo */}
          <div className="w-full md:w-1/3">
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Trainer Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold">{trainer.name}</h2>
            <p className="text-gray-600">{trainer.specialization}</p>

            {/* Bio */}
            <div className="mt-4">
              <h3 className="text-xl font-bold">About Me</h3>
              <p className="text-gray-700">{trainer.bio}</p>
            </div>

            {/* Qualifications */}
            <div className="mt-4">
              <h3 className="text-xl font-bold">Qualifications</h3>
              <ul className="list-disc list-inside text-gray-700">
                {trainer.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>

            {/* Expertise */}
            <div className="mt-4">
              <h3 className="text-xl font-bold">Expertise</h3>
              <ul className="list-disc list-inside text-gray-700">
                {trainer.expertise.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Available Slots */}
            <div className="mt-4">
              <h3 className="text-xl font-bold">Available Slots</h3>
              <ul className="list-disc list-inside text-gray-700">
                {trainer.availableSlots.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </div>

            {/* Introductory Video */}
            <div className="mt-4">
              <h3 className="text-xl font-bold">Introductory Video</h3>
              <video controls className="w-full rounded-lg mt-2">
                <source src={trainer.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;