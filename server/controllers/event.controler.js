const Event = require('../models/event');

exports.getEvents = async (req, res, next) => {
  const { page = 1, limit = 9 } = req.query;
  try {
    const events = await Event.find()
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const allEvents = await Event.countDocuments();
    res.status(200).json({
      message: 'Fetched events successfully!',
      events: events,
      totalPages: Math.ceil(allEvents / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  try {
    if (!event) {
      const error = new Error('Could not find event!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Event fetched!', event: event });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  const evenItd = req.params.eventId;
  const updateEvent = req.body;
  try {
    const event = await Event.findOneAndUpdate({ _id: evenItd }, updateEvent, {
      new: true,
    });
    if (!event) {
      const error = new Error('Could not find event!');
      error.statusCode = 404;
      throw error;
    }
    const result = await event.save();
    res.status(200).json({ message: 'Event updated!', event: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addEvent = async (req, res, next) => {
  const { firstname, lastname, email, date } = req.body;
  const event = new Event({
    firstname,
    lastname,
    email,
    date,
  });
  try {
    await event.save();
    res.status(201).json({
      event,
      message: 'Event created!',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      const error = new Error('Could not find event!');
      error.statusCode = 404;
      throw error;
    }
    await Event.findByIdAndRemove(eventId);
    res.status(200).json({ message: 'Event deleted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
