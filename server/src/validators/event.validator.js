const Joi = require('joi');
const { CATEGORIES } = require('../models/Event');

const eventQuerySchema = Joi.object({
  search: Joi.string().trim().allow('').optional(),
  category: Joi.string()
    .valid(...CATEGORIES)
    .optional()
    .messages({
      'any.only': 'Invalid category',
    }),
  sortBy: Joi.string().trim().optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(50).default(10).optional(),
});

module.exports = { eventQuerySchema };
