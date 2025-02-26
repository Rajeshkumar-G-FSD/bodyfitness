import React, { useEffect, useState } from "react";
import { fetchTrainers } from "../services/api";

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers()
      .then((response) => setTrainers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h2 className="text-2xl font-bold mb-4">Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{trainer.name}</h3>
            <p className="text-gray-600">{trainer.specialization}</p>
            <p className="text-sm text-gray-500 mt-2">{trainer.bio}</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-700">Available Slots:</p>
              <ul className="list-disc list-inside text-gray-600">
                {trainer.availableSlots.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerList;