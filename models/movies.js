const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema ({
  title: String,
  runTime: Number,
  director: String,
  genre: String,
  year: Number,
  image: String,
})

const Movies = mongoose.model('Movie', movieSchema)

module.exports = Movies