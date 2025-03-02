const Trainer = require("../models/Trainer");
const Review = require("../models/Review");


// Fetch trainer profile
exports.getTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Fetch trainer details
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    // Fetch classes taught by the trainer
    const classes = await Class.find({ trainer: trainerId });

    res.status(200).json({ trainer, classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch trainer reviews
exports.getTrainerReviews = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const reviews = await Review.find({ trainerId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Submit trainer review
exports.submitTrainerReview = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { rating, comment } = req.body;
    const review = new Review({ trainerId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

// Get a single trainer by ID
exports.getTrainerById = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateTrainerProfile = async (req, res) => {
  const { trainerId } = req.params;
  const updateData = req.body;

  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(trainerId, updateData, { new: true });
    res.status(200).json(updatedTrainer);
  } catch (error) {
    res.status(500).json({ message: "Error updating trainer profile", error });
  }
};


exports.createTrainer = async (req, res) => {
  try {
    const { name, specialization, bio, photo, video, qualifications, expertise, availableSlots } = req.body;

    // Validate input
    if (!name || !specialization || !bio) {
      return res.status(400).json({ message: "Name, specialization, and bio are required." });
    }

    // Create a new trainer
    const newTrainer = new Trainer({
      name,
      specialization,
      bio,
      photo,
      video,
      qualifications,
      expertise,
      availableSlots,
    });

    // Save the trainer to the database
    await newTrainer.save();

    res.status(201).json({
      message: "Trainer created successfully",
      trainer: newTrainer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};