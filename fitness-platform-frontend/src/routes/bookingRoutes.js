const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Fetch user bookings
router.get("/users/:userId/bookings", bookingController.getUserBookings);

// Reschedule booking
router.put("/:bookingId/reschedule", bookingController.rescheduleBooking);

// Cancel booking
router.delete("/:bookingId", bookingController.cancelBooking);

// Fetch trainer bookings
router.get("/trainers/:trainerId/bookings", bookingController.getTrainerBookings);

module.exports = router;