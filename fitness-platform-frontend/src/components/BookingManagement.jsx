import React, { useState } from "react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      className: "Yoga Basics",
      date: "2023-10-15",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      className: "Advanced Cardio",
      date: "2023-10-16",
      time: "04:00 PM",
      status: "Confirmed",
    },
  ]);

  const handleReschedule = (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    if (newDate) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, date: newDate } : booking
        )
      );
      alert("Booking rescheduled successfully!");
    }
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      alert("Booking canceled successfully!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
      <h3 className="text-2xl font-semibold mb-4">Your Bookings</h3>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded-lg mb-4">
            <h4 className="text-xl font-semibold">{booking.className}</h4>
            <p className="text-gray-600">
              {booking.date} at {booking.time}
            </p>
            <p className="text-sm text-gray-500">Status: {booking.status}</p>
            <div className="mt-2">
              <button
                onClick={() => handleReschedule(booking.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-colors duration-300"
              >
                Reschedule
              </button>
              <button
                onClick={() => handleCancel(booking.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingManagement;