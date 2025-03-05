import React from "react";
import BookingManagement from "../components/BookingManagement.jsx";

const BookingManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fitness Platform</h1>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-200">Home</a></li>
            <li><a href="/trainers" className="hover:text-gray-200">Trainers</a></li>
            <li><a href="/classes" className="hover:text-gray-200">Classes</a></li>
            <li><a href="/bookings" className="font-bold underline">Booking Management</a></li>
            <li><a href="/feedback" className="hover:text-gray-200">Feedback</a></li>
            <li><a href="/login" className="hover:text-gray-200">Login</a></li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8">Booking Management</h2>
        <BookingManagement />
      </div>

      <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 Fitness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookingManagementPage;