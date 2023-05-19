const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const tasks = require('./routes/tasks.js');
const DB = require('./db/connect.js');
const notFoundPage = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
require('dotenv').config();

// get static
app.use(express.static('./public'));

// parse body to json if needed(in case we have post request)
app.use(express.json());

// set routes for '/api/v1/tasks'
app.use('/api/v1/tasks', tasks);

// error page(not found 404)
app.use('*', notFoundPage);

// if we have error (try/catch)
app.use(errorHandlerMiddleware);

const connectDB = async () => {
  try {
    await DB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (e) {
    console.log(e);
  }
}

connectDB();