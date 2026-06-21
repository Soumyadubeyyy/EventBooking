const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');
const { setTokenCookie, clearTokenCookie } = require('../utils/cookie');

/**
 * POST /api/auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.register(name, email, password);

  setTokenCookie(res, token);

  res.status(201).json({
    success: true,
    data: { user },
    message: 'Registration successful',
  });
});

/**
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);

  setTokenCookie(res, token);

  res.status(200).json({
    success: true,
    data: { user },
    message: 'Login successful',
  });
});

/**
 * POST /api/auth/logout
 */
const logout = asyncHandler(async (req, res) => {
  clearTokenCookie(res);

  res.status(200).json({
    success: true,
    data: null,
    message: 'Logged out successfully',
  });
});

/**
 * GET /api/auth/me
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);

  res.status(200).json({
    success: true,
    data: { user },
    message: 'User profile retrieved',
  });
});

module.exports = { register, login, logout, getMe };
