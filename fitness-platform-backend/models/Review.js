const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure this is defined
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);