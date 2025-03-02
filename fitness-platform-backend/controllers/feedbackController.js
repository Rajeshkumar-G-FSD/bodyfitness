const Feedback = require("../models/Feedback");
const Trainer = require("../models/Trainer");
const User = require("../models/User");

// Submit feedback for a trainer
exports.submitFeedback = async (req, res) => {
  try {
    const { trainerId, userId, rating, comment } = req.body;

    // Validate input
    if (!trainerId || !userId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the trainer exists
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate rating (must be between 1 and 5)
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    // Create a new feedback
    const feedback = new Feedback({ trainerId, userId, rating, comment });
    await feedback.save();

    // Update the trainer's average rating (optional)
    const feedbacks = await Feedback.find({ trainerId });
    const totalRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRating / feedbacks.length;

    await Trainer.findByIdAndUpdate(trainerId, { averageRating });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all reviews (feedback) for a specific trainer
exports.getTrainerReviews = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Check if the trainer exists
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    // Fetch all feedback for the trainer and populate user details
    const reviews = await Feedback.find({ trainerId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete feedback (optional, for admin use)
exports.deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Check if the feedback exists
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    // Delete the feedback
    await Feedback.findByIdAndDelete(feedbackId);

    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all feedback for a trainer
exports.getTrainerFeedback = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Fetch feedback for the trainer
    const feedback = await Feedback.find({ trainerId }).populate("userId");

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};