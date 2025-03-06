const express = require("express");
const classController = require("../controllers/classController");
const Class = require("../models/Class");
const router = express.Router();

// Get all classes
//router.get("/", classController.getClasses);

// Book a class
router.post("/", classController.bookClass);

//router.post("/", classController.createClass);

// Create a new class
// POST endpoint
router.post("/", async (req, res) => {
  const { userId, classId, name, description, type, duration, date, time, trainer } = req.body;

  try {
    const newClass = new Class({
      userId,
      classId,
      name,
      description,
      type,
      duration,
      date,
      time,
      trainer,
    });

    console.log("Saving class:", newClass); // Debug log
    const savedClass = await newClass.save();
    console.log("Class saved:", savedClass); // Debug log
    res.status(201).json(savedClass);
  } catch (error) {
    console.error("Error saving class:", error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint
router.get("/", async (req, res) => {
  try {
    console.log("Fetching classes from database..."); // Debug log
    const classes = await Class.find();
    console.log("Classes fetched:", classes); // Debug log
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error); // Debug log
    res.status(500).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find(); // Fetch all classes from the database
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 

module.exports = router;

