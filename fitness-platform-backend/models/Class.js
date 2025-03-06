// models/Class.js
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Class", ClassSchema);