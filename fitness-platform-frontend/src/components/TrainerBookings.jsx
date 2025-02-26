import React, { useEffect, useState } from "react";
import { fetchTrainerBookings } from "../services/api";

const TrainerBookings = ({ trainerId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchTrainerBookings(trainerId)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error(error));
  }, [trainerId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Class Schedule</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold">{booking.className}</h3>
            <p className="text-gray-600">{booking.date} at {booking.time}</p>
            <p className="text-sm text-gray-500">Booked by: {booking.userName}</p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default TrainerBookings;