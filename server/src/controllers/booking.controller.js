const asyncHandler = require('../utils/asyncHandler');
const bookingService = require('../services/booking.service');

/**
 * POST /api/bookings
 */
const createBooking = asyncHandler(async (req, res) => {
  const { eventId, seats } = req.body;
  const booking = await bookingService.createBooking(req.user.id, eventId, seats);

  res.status(201).json({
    success: true,
    data: { booking },
    message: 'Booking created successfully',
  });
});

/**
 * GET /api/bookings/my
 */
const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getUserBookings(req.user.id);

  res.status(200).json({
    success: true,
    data: { bookings },
    message: 'Bookings retrieved successfully',
  });
});

/**
 * PATCH /api/bookings/:id/cancel
 */
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    data: { booking },
    message: 'Booking cancelled successfully',
  });
});

module.exports = { createBooking, getUserBookings, cancelBooking };
