const Images = require('./images')
const Movie = require('./movie')
const MovieOverview = require('./movie-overview')
const Query = require('./query')
const TvShow = require('./tv-show')
const TvShowOverview = require('./tv-show-overview')

module.exports = {
  Movie,
  MovieOverview,
  TvShow,
  TvShowOverview,
  Images,
  Query,
  ReleaseDateType: {
    PREMIERE: 1,
    THEATRICAL_LIMITED: 2,
    THEATRICAL: 3,
    DIGITAL: 4,
    PHYSICAL: 5,
    TV: 6
  }
}
