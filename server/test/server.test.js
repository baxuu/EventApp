const supertest = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const createServer = require('../server');
const Event = require('../models/event');

dotenv.config();

beforeAll((done) => {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_TEST}:${process.env.DB_PASS_TEST}@cluster0.fpxaj.mongodb.net/${process.env.DB_NAME_TEST}?retryWrites=true&w=majority`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => done()
  );
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();

test('get all events/', async () => {
  const event = await Event.create({
    firstname: 'Kacper',
    lastname: 'Kacprowicz',
    email: 'kacpo@gmail.com',
    date: '2021-11-19',
  });

  await supertest(app)
    .get('/events')
    .expect(200)
    .then((response) => {
      expect(Object(response.body)).toBeTruthy();
      expect(response.body.events[0].firstname).toBe(event.firstname);
      expect(response.body.events[0].lastname).toBe(event.lastname);
      expect(response.body.events[0].email).toBe(event.email);
      expect(response.body.events[0].date).toBe(event.date);
    });
});

test('get single event events/:eventId', async () => {
  const event = await Event.create({
    firstname: 'Cezary',
    lastname: 'Korrrmorr',
    email: 'cezary@gmail.com',
    date: '2010-01-04',
  });
  await supertest(app)
    .get(`/events/${event.id}`)
    .expect(200)
    .then((response) => {
      expect(Object(response.body)).toBeTruthy();
      expect(response.body.event.firstname).toBe(event.firstname);
      expect(response.body.event.lastname).toBe(event.lastname);
      expect(response.body.event.email).toBe(event.email);
      expect(response.body.event.date).toBe(event.date);
    });
});
test('create event events/', async () => {
  const data = {
    firstname: 'Gracjan',
    lastname: 'Wichniar',
    email: 'wichniar@gmail.com',
    date: '2014-04-12',
  };

  await supertest(app)
    .post('/events/')
    .send(data)
    .expect(201)
    .then(async (response) => {
      expect(response.body.event._id).toBeTruthy();
      expect(response.body.event.firstname).toBe(data.firstname);
      expect(response.body.event.lastname).toBe(data.lastname);
      expect(response.body.event.email).toBe(data.email);
      expect(response.body.event.date).toBe(data.date);
      const event = await Event.findOne({ _id: response.body.event._id });
      expect(event).toBeTruthy();
      expect(event.firstname).toBe(data.firstname);
      expect(event.lastname).toBe(data.lastname);
      expect(event.email).toBe(data.email);
      expect(event.date).toBe(data.date);
    });
});

test('update event events/:eventId', async () => {
  const event = await Event.create({
    firstname: 'Robus',
    lastname: 'Kokus',
    email: 'kokus@gmail.com',
    date: '1998-04-11',
  });

  const data = {
    firstname: 'Krystian',
    lastname: 'Milo',
    email: 'milus@gmail.com',
    date: '1978-11-11',
  };
  await supertest(app)
    .put(`/events/${event.id}`)
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.event._id).toBe(event.id);
      expect(response.body.event.firstname).toBe(data.firstname);
      expect(response.body.event.lastname).toBe(data.lastname);
      expect(response.body.event.email).toBe(data.email);
      expect(response.body.event.date).toBe(data.date);
      const newEvent = await Event.findOne({ _id: response.body.event._id });
      expect(newEvent).toBeTruthy();
      expect(newEvent.firstname).toBe(data.firstname);
      expect(newEvent.lastname).toBe(data.lastname);
      expect(newEvent.email).toBe(data.email);
      expect(newEvent.date).toBe(data.date);
    });
});
test('delete event events/:eventId', async () => {
  const event = await Event.create({
    firstname: 'Monika',
    lastname: 'Morkus',
    email: 'morkus@gmail.com',
    date: '2018-01-01',
  });

  await supertest(app)
    .delete(`/events/${event.id}`)
    .expect(200)
    .then(async () => {
      expect(await Event.findOne({ _id: event.id })).toBeFalsy();
    });
});
