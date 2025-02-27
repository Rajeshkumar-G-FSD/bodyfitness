import React, { useState } from "react";
import { updateTrainerAvailability } from "../services/api";

const TrainerAvailability = ({ trainerId }) => {
  const [availability, setAvailability] = useState({
    date: "",
    timeSlots: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTrainerAvailability(trainerId, availability);
      alert("Availability updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Set Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={availability.date}
            onChange={(e) => setAvailability({ ...availability, date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Time Slots</label>
          <input
            type="text"
            value={availability.timeSlots.join(", ")}
            onChange={(e) =>
              setAvailability({
                ...availability,
                timeSlots: e.target.value.split(", "),
              })
            }
            className="w-full p-2 border rounded"
            placeholder="e.g., 10:00 AM, 02:00 PM"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Update Availability
        </button>
      </form>
    </div>
  );
};

export default TrainerAvailability;