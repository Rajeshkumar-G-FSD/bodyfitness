import React from "react";
import TrainerList from "../components/TrainerList";
import ClassSchedule from "../components/ClassSchedule";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Fitness Platform</h1>
        <TrainerList />
        <ClassSchedule />
      </div>
    </div>
  );
};

export default Home;