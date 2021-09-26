const router = require('express').Router()
const user = require('./user')
const movies= require('./movie')
const categories = require('./categories')
const characters = require('./characters')
const actor = require('./movies_character')
const genre = require('./movies_genre')

//router
router.use('/user', user)
router.use('/movies', movies)
router.use('/categories', categories)
router.use('/characters', characters)
router.use('/add-actor', actor)
router.use('/add-genre', genre)



module.exports = router;