const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required'],
  },
  seatsBooked: {
    type: Number,
    required: [true, 'Number of seats is required'],
    min: [1, 'Must book at least 1 seat'],
  },
  status: {
    type: String,
    enum: {
      values: ['confirmed', 'cancelled'],
      message: '{VALUE} is not a valid status',
    },
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.index({ user: 1, event: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
