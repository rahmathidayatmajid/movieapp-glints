const router = require('express').Router()
const user = require('./user')
const movies = require('./movie')
const categories = require('./categories')
const characters = require('./characters')
const movie_character = require('./movies_character')
const movie_category = require('./movies_genre')
const review = require('./review')
const watchlist = require('./watchlist')
    //router

router.use('/users', user) 
router.use('/movies', movies) 
router.use('/categories', categories)
router.use('/characters', characters)
router.use('/movie-character', movie_character) 
router.use('/movie-category', movie_category) 
router.use('/reviews', review)
router.use('/watchlist', watchlist)









module.exports = router;