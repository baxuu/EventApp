const mongoose = require('mongoose');
const dotenv = require('dotenv');

const createServer = require('./server');

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kop6q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    const app = createServer();
    const PORT = 8080;
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
  });
