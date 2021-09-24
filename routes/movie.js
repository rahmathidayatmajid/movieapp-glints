const moviesController = require('../controllers/moviesController');
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const router = require('express').Router()

router.post('/add', moviesController.postMovie)
router.get('/:id', moviesController.getMovie)
// router.put('/:id', moviesController.getMovieById)

module.exports = router;