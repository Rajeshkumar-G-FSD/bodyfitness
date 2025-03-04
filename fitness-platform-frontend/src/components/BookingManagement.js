import React, { useEffect, useState } from "react";
import {
  fetchUserBookings,
  rescheduleBooking,
  cancelBooking,
} from "../services/api";

const BookingManagement = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchUserBookings(userId);
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleReschedule = async (bookingId) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (HH:MM AM/PM):");
    if (newDate && newTime) {
      try {
        await rescheduleBooking(bookingId, newDate, newTime);
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, date: newDate, time: newTime }
              : booking
          )
        );
        alert("Booking rescheduled successfully!");
      } catch (error) {
        console.error("Failed to reschedule booking:", error);
      }
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      alert("Booking canceled successfully!");
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
            <h3 className="text-xl font-semibold">{booking.classId.name}</h3>
            <p className="text-gray-600">{booking.date} at {booking.time}</p>
            <div className="mt-2">
              <button
                onClick={() => handleReschedule(booking._id)}
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

export default BookingManagement;