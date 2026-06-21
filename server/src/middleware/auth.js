const { verifyToken } = require('../utils/jwt');

/**
 * Authentication middleware.
 * Extracts JWT from httpOnly cookie, verifies it, and attaches user info to req.
 */
const auth = (req, res, next) => {
  const token = req.cookies && req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

module.exports = auth;
