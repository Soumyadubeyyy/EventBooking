const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

// POST /api/auth/register
router.post('/register', validate(registerSchema, 'body'), authController.register);

// POST /api/auth/login
router.post('/login', validate(loginSchema, 'body'), authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

// GET /api/auth/me
router.get('/me', auth, authController.getMe);

module.exports = router;
