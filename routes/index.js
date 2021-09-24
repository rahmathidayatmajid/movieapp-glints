const router = require('express').Router()
    , moviesRoutes= require('./movie')

router.use('/movies', moviesRoutes)

module.exports = router;