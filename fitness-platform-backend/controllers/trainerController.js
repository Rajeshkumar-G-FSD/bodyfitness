const Trainer = require("../models/Trainer");

// Get all trainers
exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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