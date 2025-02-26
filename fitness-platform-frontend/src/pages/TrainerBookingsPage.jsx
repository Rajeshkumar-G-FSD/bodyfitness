import React from "react";
import TrainerBookings from "../components/TrainerBookings";

const TrainerBookingsPage = () => {
  const trainerId = "trainer-id-here"; // Replace with actual trainer ID
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Your Class Schedule</h1>
        <TrainerBookings trainerId={trainerId} />
      </div>
    </div>
  );
};

export default TrainerBookingsPage;