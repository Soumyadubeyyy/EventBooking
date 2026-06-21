const mongoose = require('mongoose');

const CATEGORIES = [
  'conference',
  'workshop',
  'concert',
  'sports',
  'meetup',
  'webinar',
  'festival',
  'other',
];

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
  },
  dateTime: {
    type: Date,
    required: [true, 'Event date and time is required'],
    index: true,
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    min: [1, 'Total seats must be at least 1'],
  },
  availableSeats: {
    type: Number,
    required: [true, 'Available seats is required'],
    min: [0, 'Available seats cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: CATEGORIES,
      message: '{VALUE} is not a valid category',
    },
  },
  imageUrl: {
    type: String,
    default: 'https://picsum.photos/seed/default/800/400',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

eventSchema.index({ dateTime: 1 });

module.exports = mongoose.model('Event', eventSchema);
module.exports.CATEGORIES = CATEGORIES;
