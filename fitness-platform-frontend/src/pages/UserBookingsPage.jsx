import React from "react";
import UserBookings from "../components/UserBookings";

const UserBookingsPage = () => {
  const userId = "user-id-here"; // Replace with actual user ID
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Your Bookings</h1>
        <UserBookings userId={userId} />
      </div>
    </div>
  );
};

export default UserBookingsPage;