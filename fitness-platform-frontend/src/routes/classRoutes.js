const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router();

// Fetch classes with filters
router.get("/", classController.getClasses);

// Book a class
router.post("/", classController.bookClass);
// Create a new class
router.post("/", classController.createClass);

module.exports = router;

// Fetch classes with filters


