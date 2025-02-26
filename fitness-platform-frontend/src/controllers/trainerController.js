const Trainer = require("../models/Trainer");

// Update trainer availability
exports.updateTrainerAvailability = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { date, timeSlots } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(
      trainerId,
      { availability: { date, timeSlots } },
      { new: true }
    );
    res.status(200).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};