const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const {
  createBookingSchema,
  cancelBookingParamsSchema,
} = require('../validators/booking.validator');

// POST /api/bookings — create booking (auth required)
router.post('/', auth, validate(createBookingSchema, 'body'), bookingController.createBooking);

// GET /api/bookings/my — get user's bookings (auth required)
router.get('/my', auth, bookingController.getUserBookings);

// PATCH /api/bookings/:id/cancel — cancel booking (auth required)
router.patch(
  '/:id/cancel',
  auth,
  validate(cancelBookingParamsSchema, 'params'),
  bookingController.cancelBooking
);

module.exports = router;
