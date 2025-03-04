const express = require("express");
const trainerController = require("../controllers/trainerController");

const router = express.Router();

// Fetch trainer profile
router.get("/:trainerId", trainerController.getTrainerProfile);

// Fetch trainer reviews
router.get("/:trainerId/reviews", trainerController.getTrainerReviews);

// Submit trainer review
router.post("/:trainerId/reviews", trainerController.submitTrainerReview);

// Update trainer profile
router.put("/:trainerId", trainerController.updateTrainerProfile);

// Get all trainers
router.get("/", trainerController.getTrainers);


router.get("/:trainerId", trainerController.getTrainerProfile);

// Create a new trainer
router.post("/trainers", trainerController.createTrainer);



module.exports = router;