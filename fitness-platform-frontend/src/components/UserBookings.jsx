import React, { useEffect, useState } from "react";
import { fetchUserBookings, rescheduleBooking, cancelBooking } from "../services/api";

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserBookings(userId)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error(error));
  }, [userId]);

  const handleReschedule = async (bookingId, newDate) => {
    try {
      const response = await rescheduleBooking(bookingId, newDate);
      alert("Booking rescheduled successfully!");
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, date: newDate } : booking
        )
      );
      console.log(response.data);
    } catch (error) {
      console.error("Failed to reschedule booking:", error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId);
      alert("Booking canceled successfully!");
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      console.log(response.data);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold">{booking.className}</h3>
            <p className="text-gray-600">{booking.date} at {booking.time}</p>
            <div className="mt-2">
              <button
                onClick={() => {
                  const newDate = prompt("Enter new date (YYYY-MM-DD):");
                  if (newDate) handleReschedule(booking._id, newDate);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-colors duration-300"
              >
                Reschedule
              </button>
              <button
                onClick={() => handleCancel(booking._id)}
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

export default UserBookings;