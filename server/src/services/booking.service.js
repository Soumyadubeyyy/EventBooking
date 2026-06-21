const Event = require('../models/Event');
const Booking = require('../models/Booking');

/**
 * Create a new booking with atomic seat decrement.
 * Uses findOneAndUpdate with $gte guard to prevent overselling.
 *
 * @param {string} userId
 * @param {string} eventId
 * @param {number} seats
 * @returns {object} populated booking
 */
const createBooking = async (userId, eventId, seats) => {
  // Check event exists
  const event = await Event.findById(eventId);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  // Check event is not in the past
  if (new Date(event.dateTime) < new Date()) {
    const error = new Error('Cannot book a past event');
    error.statusCode = 400;
    throw error;
  }

  // Atomic seat decrement — only succeeds if enough seats available
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId, availableSeats: { $gte: seats } },
    { $inc: { availableSeats: -seats } },
    { new: true }
  );

  if (!updatedEvent) {
    const error = new Error('Not enough seats available');
    error.statusCode = 409;
    throw error;
  }

  // Create booking document
  const booking = await Booking.create({
    user: userId,
    event: eventId,
    seatsBooked: seats,
    status: 'confirmed',
  });

  // Return populated booking
  const populatedBooking = await Booking.findById(booking._id).populate(
    'event',
    'name dateTime venue category imageUrl'
  );

  return populatedBooking;
};

/**
 * Get all bookings for a user.
 * @param {string} userId
 * @returns {Array} bookings populated with event data
 */
const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId })
    .populate('event', 'name dateTime venue category imageUrl totalSeats availableSeats')
    .sort({ createdAt: -1 });

  return bookings;
};

/**
 * Cancel a booking and restore seats atomically.
 * Idempotent: re-cancelling an already cancelled booking returns it as-is.
 *
 * @param {string} bookingId
 * @param {string} userId
 * @returns {object} cancelled booking
 */
const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  // Authorization check
  if (booking.user.toString() !== userId) {
    const error = new Error('Not authorized to cancel this booking');
    error.statusCode = 403;
    throw error;
  }

  // Idempotent: if already cancelled, just return it
  if (booking.status === 'cancelled') {
    const populatedBooking = await Booking.findById(bookingId).populate(
      'event',
      'name dateTime venue category imageUrl'
    );
    return populatedBooking;
  }

  // Set status to cancelled
  booking.status = 'cancelled';

  // Atomically restore seats
  await Event.findByIdAndUpdate(booking.event, {
    $inc: { availableSeats: booking.seatsBooked },
  });

  await booking.save();

  const populatedBooking = await Booking.findById(bookingId).populate(
    'event',
    'name dateTime venue category imageUrl'
  );

  return populatedBooking;
};

module.exports = { createBooking, getUserBookings, cancelBooking };
