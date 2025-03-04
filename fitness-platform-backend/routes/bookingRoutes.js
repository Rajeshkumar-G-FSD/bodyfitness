const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Book a class
router.post("/", async (req, res) => {
  try {
    const { userId, classId, date, time } = req.body;
    const booking = new Booking({ userId, classId, date, time });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch user bookings
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("classId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reschedule booking
router.put("/:bookingId/reschedule", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { newDate, newTime } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { date: newDate, time: newTime },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel booking
router.delete("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;