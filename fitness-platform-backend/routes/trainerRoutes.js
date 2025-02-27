const express = require("express");
const trainerController = require("../controllers/trainerController");

const router = express.Router();

// Get all trainers
router.get("/", trainerController.getTrainers);

// Create a new trainer
router.post("/", trainerController.createTrainer);

// Update trainer availability
router.put("/:trainerId/availability", trainerController.updateTrainerAvailability);

module.exports = router;