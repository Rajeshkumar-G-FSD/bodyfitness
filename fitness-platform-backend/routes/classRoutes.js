const express = require("express");
const classController = require("../controllers/classController");
const Class = require("../models/Class");
const router = express.Router();

// Get all classes
//router.get("/", classController.getClasses);

// Book a class
router.post("/", classController.bookClass);

router.post("/", classController.createClass);



  router.get("/", async (req, res) => {
    try {
      const { type, duration, time } = req.query;
      const filters = {};
  
      if (type) filters.type = type;
      if (duration) filters.duration = duration;
      if (time) filters.time = time;
  
      const classes = await Class.find(filters).populate("trainer");
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;

