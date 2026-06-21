const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

/**
 * Register a new user.
 * @param {string} name
 * @param {string} email
 * @param {string} password - plain text password
 * @returns {{ user: object, token: string }}
 */
const register = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({ name, email, passwordHash });

  // Generate token
  const token = generateToken(user._id);

  // Return user without passwordHash
  const userObj = user.toObject();
  delete userObj.passwordHash;

  return { user: userObj, token };
};

/**
 * Login a user.
 * @param {string} email
 * @param {string} password
 * @returns {{ user: object, token: string }}
 */
const login = async (email, password) => {
  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Generate token
  const token = generateToken(user._id);

  // Return user without passwordHash
  const userObj = user.toObject();
  delete userObj.passwordHash;

  return { user: userObj, token };
};

/**
 * Get current user profile.
 * @param {string} userId
 * @returns {object} user without passwordHash
 */
const getMe = async (userId) => {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = { register, login, getMe };
