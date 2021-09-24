const moviesController = require('../controllers/moviesController');

const router = require('express').Router()

router.get('/', moviesController.getMovie)
module.exports = router;