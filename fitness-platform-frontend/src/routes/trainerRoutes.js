const express = require("express");
const trainerController = require("../controllers/trainerController");

const router = express.Router();

// Update trainer availability
router.put("/:trainerId/availability", trainerController.updateTrainerAvailability);

module.exports = router;