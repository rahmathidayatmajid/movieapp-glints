const router = require('express').Router()
const user = require('./user')
const movies = require('./movie')
const categories = require('./categories')
const characters = require('./characters')
const review = require('./review')
    //router

router.use('/user', user)
router.use('/movies', movies)
router.use('/categories', categories)
router.use('/characters', characters)
router.use('/review', review)









module.exports = router;