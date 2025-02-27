const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Update user profile
router.put("/:userId/profile", userController.updateUserProfile);

module.exports = router;

// User Dashboard
router.get("/:userId/dashboard", userController.getUserDashboard);

module.exports = router;