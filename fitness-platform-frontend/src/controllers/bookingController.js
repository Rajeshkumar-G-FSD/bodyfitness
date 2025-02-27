const Booking = require("../models/Booking");
// Fetch user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("classId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reschedule booking
exports.rescheduleBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { newDate } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { date: newDate },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Fetch trainer bookings
exports.getTrainerBookings = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const bookings = await Booking.find({ trainerId }).populate("userId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};