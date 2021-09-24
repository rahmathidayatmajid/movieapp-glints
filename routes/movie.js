const moviesController = require('../controllers/moviesController');

const router = require('express').Router()

router.post('/', moviesController.postMovie)

module.exports = router;