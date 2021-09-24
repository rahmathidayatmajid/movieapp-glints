const moviesController = require('../controllers/moviesController');

const router = require('express').Router()

router.post('/add', moviesController.postMovie)
router.get('/', moviesController.getMovie)

module.exports = router;