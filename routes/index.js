const router = require('express').Router()
const user = require('./user')
const moviesRoutes= require('./movie')

//router

router.use('/user', user)
router.use('/movies', moviesRoutes)










module.exports = router;