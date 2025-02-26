const express = require("express");
const trainerController = require("../controllers/trainerController");

const router = express.Router();

// Fetch trainer profile
router.get("/:trainerId", trainerController.getTrainerProfile);

// Fetch trainer reviews
router.get("/:trainerId/reviews", trainerController.getTrainerReviews);

// Submit trainer review
router.post("/:trainerId/reviews", trainerController.submitTrainerReview);

module.exports = router;