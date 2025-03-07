import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = ({ userId }) => {
  const [dashboardData, setDashboardData] = useState({
    upcomingClasses: [],
    bookingHistory: [],
    recommendations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDashboard = async (userId) => {
      try {
        const response = await axios.get(`https://renderbackend-1-gw0j.onrender.com/api/users/${userId}/dashboard`);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        throw error;
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      {/* Upcoming Classes */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upcoming Classes</h3>
        {dashboardData.upcomingClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData.upcomingClasses.map((booking) => (
              <div key={booking._id} className="border p-4 rounded-lg">
                <h4 className="text-lg font-medium">{booking.classId.name}</h4>
                <p className="text-sm text-gray-600">
                  {booking.date} at {booking.time}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming classes.</p>
        )}
      </div>

      {/* Booking History */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Booking History</h3>
        {dashboardData.bookingHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData.bookingHistory.map((booking) => (
              <div key={booking._id} className="border p-4 rounded-lg">
                <h4 className="text-lg font-medium">{booking.classId.name}</h4>
                <p className="text-sm text-gray-600">
                  {booking.date} at {booking.time}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No booking history.</p>
        )}
      </div>

      {/* Class Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Class Recommendations</h3>
        {dashboardData.recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData.recommendations.map((cls) => (
              <div key={cls._id} className="border p-4 rounded-lg">
                <h4 className="text-lg font-medium">{cls.name}</h4>
                <p className="text-sm text-gray-600">{cls.description}</p>
                <p className="text-sm text-gray-500">
                  {cls.date} at {cls.time}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;