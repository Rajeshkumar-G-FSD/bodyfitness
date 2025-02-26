import React, { useEffect, useState } from "react";
import { fetchClasses } from "../services/api";

const ClassSchedule = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses()
      .then((response) => setClasses(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <h2 className="text-2xl font-bold mb-4">Class Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{cls.name}</h3>
            <p className="text-gray-600">{cls.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {cls.date} at {cls.time}
            </p>
            <p className="font-semibold text-gray-700">Trainer: {cls.trainer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSchedule;