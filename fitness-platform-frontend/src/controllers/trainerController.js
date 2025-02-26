const Trainer = require("../models/Trainer");
const Review = require("../models/Review");

// Fetch trainer profile
exports.getTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const trainer = await Trainer.findById(trainerId);
    res.status(200).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
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