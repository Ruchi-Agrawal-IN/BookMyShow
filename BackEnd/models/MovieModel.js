const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  releaseDate: {
    type: Date,
    required: false,
  },

  poster: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("movies", movieSchema);
