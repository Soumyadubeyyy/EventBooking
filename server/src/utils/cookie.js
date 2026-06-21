const env = require('../config/env');

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Set httpOnly JWT cookie on the response.
 * @param {import('express').Response} res
 * @param {string} token
 */
const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SEVEN_DAYS_MS,
    path: '/',
  });
};

/**
 * Clear the JWT cookie.
 * @param {import('express').Response} res
 */
const clearTokenCookie = (res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
};

module.exports = { setTokenCookie, clearTokenCookie };
