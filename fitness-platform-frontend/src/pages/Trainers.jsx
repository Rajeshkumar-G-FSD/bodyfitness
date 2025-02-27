import React from "react";
import TrainerList from "../components/TrainerList";

const Trainers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Show Trainers</h1>
        <TrainerList />
      </div>
    </div>
  );
};

export default Trainers;