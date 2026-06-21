const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const User = require('../../src/models/User');
const Event = require('../../src/models/Event');

/**
 * Create a test user directly in the database.
 * @param {object} overrides - Fields to override
 * @returns {object} created user document
 */
const createTestUser = async (overrides = {}) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(overrides.password || 'password123', salt);

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    passwordHash,
    ...overrides,
    // Ensure passwordHash is from above, not overridden by caller's password field
  };

  // Remove plain password field if present (not in schema)
  delete userData.password;

  const user = await User.create(userData);
  return user;
};

/**
 * Login a test user via the API and return the agent with cookies set.
 * @param {object} app - Express app instance
 * @param {string} email
 * @param {string} password
 * @returns {{ agent: supertest.SuperAgentTest, body: object }}
 */
const loginTestUser = async (app, email = 'test@example.com', password = 'password123') => {
  const agent = supertest.agent(app);
  const res = await agent
    .post('/api/auth/login')
    .send({ email, password });

  return { agent, body: res.body, res };
};

/**
 * Create a test event directly in the database.
 * @param {object} overrides - Fields to override
 * @returns {object} created event document
 */
const createTestEvent = async (overrides = {}) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);

  const eventData = {
    name: 'Test Event',
    description: 'A test event for unit testing',
    dateTime: futureDate,
    venue: 'Test Venue',
    totalSeats: 100,
    availableSeats: 100,
    category: 'conference',
    imageUrl: 'https://picsum.photos/seed/test/800/400',
    ...overrides,
  };

  const event = await Event.create(eventData);
  return event;
};

module.exports = { createTestUser, loginTestUser, createTestEvent };
