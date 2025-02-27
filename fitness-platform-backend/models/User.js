const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fitnessGoals: { type: String, default: "" }, // e.g., "weight loss", "muscle gain"
  preferences: { type: String, default: "" }, // e.g., "yoga", "cardio"
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // Track user bookings
});

module.exports = mongoose.model("User", UserSchema);