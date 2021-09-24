const router = require('express').Router()
const user = require('./user')
const movies= require('./movie')
const categories = require('./categories')
const characters = require('./characters')
const countRating = require('./rating')

//router

router.use('/user', user)
router.use('/movies', movies)
router.use('/categories', categories)
router.use('/characters', characters)
router.use('/rating', countRating)









module.exports = router;