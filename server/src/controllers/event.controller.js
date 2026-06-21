const asyncHandler = require('../utils/asyncHandler');
const eventService = require('../services/event.service');

/**
 * GET /api/events
 */
const getEvents = asyncHandler(async (req, res) => {
  const { search, category, sortBy, page, limit } = req.query;
  const result = await eventService.getEvents({ search, category, sortBy, page, limit });

  res.status(200).json({
    success: true,
    data: result,
    message: 'Events retrieved successfully',
  });
});

/**
 * GET /api/events/:id
 */
const getEventById = asyncHandler(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);

  res.status(200).json({
    success: true,
    data: { event },
    message: 'Event retrieved successfully',
  });
});

module.exports = { getEvents, getEventById };
