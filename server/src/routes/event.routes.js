const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const validate = require('../middleware/validate');
const { eventQuerySchema } = require('../validators/event.validator');

// GET /api/events
router.get('/', validate(eventQuerySchema, 'query'), eventController.getEvents);

// GET /api/events/:id
router.get('/:id', eventController.getEventById);

module.exports = router;
