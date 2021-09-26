const router = require('express').Router()
const user = require('./user')
const movies = require('./movie')
const categories = require('./categories')
const characters = require('./characters')
const movie_character = require('./movies_character')
const movie_category = require('./movies_genre')
const review = require('./review')
    //router

router.use('/user', user)
router.use('/movies', movies)
router.use('/categories', categories)
router.use('/characters', characters)
router.use('/movie_character', movie_character)
router.use('/movie_category', movie_category)
router.use('/review', review)









module.exports = router;