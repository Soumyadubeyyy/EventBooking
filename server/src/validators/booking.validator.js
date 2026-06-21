const Joi = require('joi');

const createBookingSchema = Joi.object({
  eventId: Joi.string().required().messages({
    'any.required': 'Event ID is required',
  }),
  seats: Joi.number().integer().min(1).required().messages({
    'number.min': 'Must book at least 1 seat',
    'any.required': 'Number of seats is required',
  }),
});

const cancelBookingParamsSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Booking ID is required',
  }),
});

module.exports = { createBookingSchema, cancelBookingParamsSchema };
