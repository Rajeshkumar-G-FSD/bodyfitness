const User = require("../models/User");
const Class = require("../models/Class");
const Booking = require("../models/Booking");


// Fetch class recommendations
exports.getClassRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    // Example recommendation logic
    const recommendations = await Class.find({
      specialization: user.preferences,
    });

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/users/:userId/dashboard
exports.getUserDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const user = await User.findById(userId).populate("bookings");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch upcoming classes (bookings with future dates)
    const currentDate = new Date();
    const upcomingClasses = await Booking.find({
      userId,
      date: { $gte: currentDate },
    }).populate("classId");

    // Fetch booking history (past bookings)
    const bookingHistory = await Booking.find({
      userId,
      date: { $lt: currentDate },
    }).populate("classId");

    // Fetch class recommendations based on user preferences
    const recommendations = await Class.find({
      type: { $in: user.preferences.split(",") }, // Match user preferences
    }).limit(5); // Limit to 5 recommendations

    // Return dashboard data
    res.status(200).json({
      upcomingClasses,
      bookingHistory,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};