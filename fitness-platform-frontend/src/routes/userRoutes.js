const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Fetch class recommendations
router.get("/:userId/recommendations", userController.getClassRecommendations);


// GET /api/users/:userId/dashboard
router.get("/:userId/dashboard", userController.getUserDashboard);

module.exports = router;