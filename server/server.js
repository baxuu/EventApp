const eventRoute = require('./routes/event.route');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/events', eventRoute);
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });
  return app;
};

module.exports = createServer;
