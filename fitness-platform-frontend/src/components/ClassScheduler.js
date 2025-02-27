import React, { useEffect, useState } from "react";
import { fetchClasses, bookClass } from "../services/api";

const ClassScheduler = () => {
  const [classes, setClasses] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    duration: "",
    timeSlot: "",
  });

  useEffect(() => {
    fetchClasses(filters)
      .then((response) => setClasses(response.data))
      .catch((error) => console.error(error));
  }, [filters]);

  const handleBookClass = async (classId) => {
    try {
      const response = await bookClass({ classId });
      alert("Class booked successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to book class:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Class Scheduling</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Class Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="yoga">Yoga</option>
              <option value="strength-training">Strength Training</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Duration</label>
            <select
              value={filters.duration}
              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="30">30 mins</option>
              <option value="60">60 mins</option>
              <option value="90">90 mins</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Time Slot</label>
            <input
              type="time"
              value={filters.timeSlot}
              onChange={(e) => setFilters({ ...filters, timeSlot: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div key={cls._id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{cls.name}</h3>
              <p className="text-gray-600">{cls.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {cls.date} at {cls.time}
              </p>
              <p className="font-semibold text-gray-700">Trainer: {cls.trainer}</p>
              <button
                onClick={() => handleBookClass(cls._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassScheduler;