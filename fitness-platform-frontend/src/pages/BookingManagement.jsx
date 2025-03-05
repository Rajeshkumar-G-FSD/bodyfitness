import React from "react";
import BookingManagement from "../components/BookingManagement.jsx";

const BookingManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      

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