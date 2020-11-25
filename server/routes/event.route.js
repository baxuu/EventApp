const express = require('express');

const eventValidationSchema = require('../validators/eventValidationSchema.js');
const validationMiddleware = require('../validators/validationMiddleware.js');
const eventController = require('../controllers/event.controler.js');

const router = express.Router();

router.post(
  '/',
  validationMiddleware(eventValidationSchema),
  eventController.addEvent
);
router.put(
  '/:eventId',
  validationMiddleware(eventValidationSchema),
  eventController.updateEvent
);
router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
