const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: Number,
  ratingCount: Number,
  image: String,
  deferLink: String,
  fullLink: String,
  avgRating: Number,
  ratingLink: Number,
  lat: Number,
  lng: Number,
  icon: String,
  filter_by: [String],
  sportsAvailable: [
    {
      id: String,
      name: String,
      icon: String,
      price: Number,
      courts: [
        {
          id: String,
          name: String,
          number: Number,
        },
      ],
    },
  ],
  location: String,
  address: {
    type: String,
    required: true,
  },
  bookings: [
    {
      courtNumber: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
      },
    },
  ],
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
