import React from "react";

const ClassList = ({ classes }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Classes</h2>
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">{cls.name}</h3>
              <p className="text-gray-600 mt-2">{cls.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {cls.date} at {cls.time}
              </p>
              <p className="font-semibold text-gray-700 mt-2">Trainer: {cls.trainer.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
};

export default ClassList;