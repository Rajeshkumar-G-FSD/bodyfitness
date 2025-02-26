const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Fetch class recommendations
router.get("/:userId/recommendations", userController.getClassRecommendations);

module.exports = router;