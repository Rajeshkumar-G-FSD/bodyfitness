const express = require("express");
const trainerController = require("../controllers/trainerController");

const Trainer = require("../models/Trainer"); // Import the Trainer model



const router = express.Router();

// Fetch trainer profile
router.get("/:trainerId", trainerController.getTrainerProfile);

// Fetch trainer reviews
router.get("/:trainerId/reviews", trainerController.getTrainerReviews);

// Submit trainer review
router.post("/:trainerId/reviews", trainerController.submitTrainerReview);

// Update trainer profile
router.put("/:trainerId", trainerController.updateTrainerProfile);

// Update trainer availability
router.put("/:trainerId/availability", trainerController.updateTrainerAvailability);

// Get all trainers
router.get("/", trainerController.getTrainers);

router.get("/:trainerId", trainerController.getTrainerProfile);


// Create a new trainer
router.post("/", async (req, res) => {
  try {
    const trainer = new Trainer(req.body); // Create a new Trainer instance
    await trainer.save(); // Save the trainer to the database
    res.status(201).json(trainer); // Return the created trainer
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
});

module.exports = router;

module.exports = router;