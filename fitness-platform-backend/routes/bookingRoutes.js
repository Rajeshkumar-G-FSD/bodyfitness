const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Fetch user bookings
router.get("/users/:userId/bookings", bookingController.getUserBookings);

// Reschedule booking
router.put("/:bookingId/reschedule", bookingController.rescheduleBooking);

// Cancel booking
router.delete("/:bookingId", bookingController.cancelBooking);

module.exports = router;