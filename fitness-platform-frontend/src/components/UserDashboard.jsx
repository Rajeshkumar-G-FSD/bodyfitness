import React, { useEffect, useState } from "react";
import { fetchUserBookings, fetchClassRecommendations } from "../services/api";

const UserDashboard = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchUserBookings(userId)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error(error));

    fetchClassRecommendations(userId)
      .then((response) => setRecommendations(response.data))
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Upcoming Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="border p-4 rounded-lg">
                <p className="text-lg font-medium">{booking.className}</p>
                <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Class Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((classRec) => (
              <div key={classRec._id} className="border p-4 rounded-lg">
                <p className="text-lg font-medium">{classRec.name}</p>
                <p className="text-sm text-gray-600">{classRec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;