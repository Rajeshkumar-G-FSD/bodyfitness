const Class = require("../models/Class");

// Fetch classes with filters
exports.getClasses = async (req, res) => {
  try {
    const { type, duration, timeSlot } = req.query;
    const filters = {};
    if (type) filters.type = type;
    if (duration) filters.duration = duration;
    if (timeSlot) filters.time = timeSlot;
    const classes = await Class.find(filters);
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Book a class
exports.bookClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const booking = new Booking({ classId, userId: req.user._id });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};