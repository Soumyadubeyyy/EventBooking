const Event = require('../models/Event');

/**
 * Get paginated and filtered events.
 * @param {object} params
 * @param {string} [params.search] - Search term for name/description
 * @param {string} [params.category] - Filter by category
 * @param {string} [params.sortBy] - Sort field
 * @param {number} [params.page] - Page number
 * @param {number} [params.limit] - Items per page
 * @returns {{ events: Array, pagination: object }}
 */
const getEvents = async ({ search, category, sortBy, page = 1, limit = 10 }) => {
  const query = {};

  // Text search on name and description using regex
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { description: searchRegex }];
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Determine sort
  let sort = { dateTime: 1 }; // default: ascending by dateTime
  if (sortBy) {
    if (sortBy.startsWith('-')) {
      sort = { [sortBy.slice(1)]: -1 };
    } else {
      sort = { [sortBy]: 1 };
    }
  }

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(query).sort(sort).skip(skip).limit(limit),
    Event.countDocuments(query),
  ]);

  return {
    events,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single event by ID.
 * @param {string} id
 * @returns {object} event
 */
const getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }
  return event;
};

module.exports = { getEvents, getEventById };
