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

const venues = [
  {
    name: '147 One Four Seven Snooker, Billiards and Pool Sports Academy',
    rating: 4.1,
    deferLink: 'https://playo.page.link/ry8TT',
    fullLink:
      'https://playo.co/venue/?venueId=4ec5b58f-d58f-4ce1-8c84-2caa63007ecc',
    avgRating: 4.1,
    ratingCount: 120,
    lat: 12.9341796,
    lng: 77.6101537,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/FIGURINEFITNESSINDIRANAGAR/SnookerRoom1652349575145.jpeg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'AVS Compound, 1st Floor, 1st Cross',
    bookings: [],
  },
  {
    name: 'OvalNet Badminton Academy - Sahakar Nagar',
    rating: 4.2,
    deferLink: 'https://z34v4.app.goo.gl/MAAX',
    fullLink:
      'https://playo.co/venue/?venueId=afbe7186-2f86-4215-8715-4b967f166b09',
    avgRating: 4.2,
    ratingCount: 95,
    lat: 13.059883,
    lng: 77.582389,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/OVALNETBADMINTONACADEMY/OvalNetBadmintonAcademy6.jpg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'No. 3/1, Kodigehalli Main Road, Adjacent to Cauvery College',
    bookings: [],
  },
  {
    name: 'OvalNet Badminton Academy - Sahakar Nagar',
    rating: 4.3,
    deferLink: 'https://z34v4.app.goo.gl/MAAX',
    fullLink:
      'https://playo.co/venue/?venueId=afbe7186-2f86-4215-8715-4b967f166b09',
    avgRating: 4.3,
    ratingCount: 110,
    lat: 13.059883,
    lng: 77.582389,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/OVALNETBADMINTONACADEMY/OvalNetBadmintonAcademy6.jpg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'No. 3/1, Kodigehalli Main Road, Adjacent to Cauvery College',
    bookings: [],
  },
  {
    name: 'Play Zone - Sahakarnagar (Shree Vayu Badminton Arena)',
    rating: 4.5,
    fullLink:
      'https://playo.co/venue?venueId=6bb450c0-318b-49e5-b7c0-c02a37d34ef8',
    deferLink: 'https://z34v4.app.goo.gl/4Kqo',
    avgRating: 4.5,
    ratingCount: 150,
    lat: 13.053750730700056,
    lng: 77.57626923775621,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/PLAYZONESAHAKARNAGARSHREEVAYUBADMINTONARENA20231206074712995440/PlayZoneSahakarnagarShreeVayuBadmintonArena1701880566748.jpeg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address:
      'Sahakar Nagar road, Adjacent to AMCO layout and Tata Nagar, Hebbal',
    bookings: [],
  },
  {
    name: 'VIN Badminton',
    rating: 4.6,
    deferLink: 'https://z34v4.app.goo.gl/RTF4',
    fullLink:
      'https://playo.co/venue/?venueId=37f3675b-dfd2-4f30-8506-a3883abef902',
    avgRating: 4.6,
    ratingCount: 200,
    lat: 13.071497063988476,
    lng: 77.58706385591489,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/VINI5BADMINTONARENA20240226042742110513/Vini5BadmintonArena1709376498394.jpg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: 'Vini5 badminton arena, 5th main road, Canara bank layout',
    bookings: [],
  },
  {
    name: 'Serve & Smash Badminton Academy',
    rating: 4.7,
    fullLink:
      'https://playo.co/venue?venueId=a0c6ceb4-d09b-4fcf-bafd-6c949a55590c',
    deferLink: 'https://z34v4.app.goo.gl/3k9a',
    avgRating: 4.7,
    ratingCount: 250,
    lat: 13.045735,
    lng: 77.572929,
    icon: 'https://maps.google.com/mapfiles/kml/paddle/4-lv.png',
    filter_by: ['Pool', 'Snooker'],
    sportsAvailable: [
      {
        id: '10',
        name: 'Badminton',
        icon: 'badminton',
        price: 500,
        courts: [
          {
            id: '10',
            name: 'Standard synthetic court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Standard synthetic court 2',
            number: 2,
          },
          {
            id: '12',
            name: 'Standard synthetic court 3',
            number: 3,
          },
        ],
      },

      {
        id: '11',
        name: 'Cricket',
        icon: 'cricket',
        price: 1100,
        courts: [
          {
            id: '10',
            name: 'Full Pitch 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Full Pitch 2',
            number: 2,
          },
        ],
      },
      {
        id: '12',
        name: 'Tennis',
        icon: 'tennis',
        price: 900,
        courts: [
          {
            id: '10',
            name: 'Court 1',
            number: 1,
          },
          {
            id: '11',
            name: 'Court 2',
            number: 2,
          },
        ],
      },
    ],
    image:
      'https://playo.gumlet.io/SERVESMASH20191003055000886885/ServeSmash0.jpeg?mode=crop&crop=smart&h=200&width=450&q=75',
    location:
      'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
    address: '1st Cross, RMV 2nd Stage, Nagashettihalli bangalore',
    bookings: [],
  },
];

async function addVenues() {
  for (const venueData of venues) {
    const existingVenue = await Venue.findOne({name: venueData.name});

    if (existingVenue) {
      console.log(`Venue "${venueData.name}" already exists. Skipping.`);
    } else {
      const newVenue = new Venue(venueData);
      await newVenue.save();
      console.log(`Venue "${venueData.name}" added successfully.`);
    }
  }
}

addVenues().catch(err => {
  console.error('Error adding venues:', err);
});

app.get('/venues', async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch venues'});
  }
});
