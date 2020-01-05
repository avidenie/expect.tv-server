const Images = require('./images')
const Movie = require('./movie')
const MovieOverview = require('./movie-overview')
const Query = require('./query')
const TvShow = require('./tv-show')

module.exports = {
  Images,
  MovieOverview,
  Movie,
  Query,
  TvShow,
  ReleaseDateType: {
    PREMIERE: 1,
    THEATRICAL_LIMITED: 2,
    THEATRICAL: 3,
    DIGITAL: 4,
    PHYSICAL: 5,
    TV: 6
  }
}
