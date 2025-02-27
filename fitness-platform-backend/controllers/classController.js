const Class = require("../models/Class");

// Get all classes with filters
exports.getClasses = async (req, res) => {
  try {
    const { type, duration, time } = req.query;
    const filters = {};
    if (type) filters.type = type;
    if (duration) filters.duration = duration;
    if (time) filters.time = time;
    const classes = await Class.find(filters).populate("trainer");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book a class
exports.bookClass = async (req, res) => {
  try {
    const { userId, classId, date, time } = req.body;
    const booking = new Booking({ userId, classId, date, time });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};