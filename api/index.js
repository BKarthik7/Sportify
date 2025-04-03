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
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('./models/user');
const Game = require('./models/game');
const Venue = require('./models/venue');

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

app.post('/register', async (req, res) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);

    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({userId: newUser._id}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    console.error('Error in /register creating user:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body();
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({error: 'Invalid #email or password'});
    }
    if (user.password !== password) {
      return res.status(401).json({message: 'Invalid email or #password'});
    }

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({userId: user._id}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});
