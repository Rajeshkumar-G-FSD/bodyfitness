const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

// Submit feedback
router.post("/", feedbackController.submitFeedback);

// Fetch trainer reviews
router.get("/:trainerId/reviews", feedbackController.getTrainerReviews);

module.exports = router;