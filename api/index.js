if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: '../.env'});
}

if (!process.env.REACT_NATIVE_DB_URL) {
  console.error('Error: Failed to load environment variables.');
  process.exit(1);
}

const cors = require('cors');
const moment = require('moment');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.REACT_NATIVE_DB_URL;

if (!dbUrl) {
  console.error(
    'Error: REACT_NATIVE_DB_URL is not set in the environment variables.',
  );
  process.exit(1);
}

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
