const moviesController = require('../controllers/moviesController');
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const router = require('express').Router()

router.post('/add', moviesController.postMovie)
router.get('/search/:q_name', moviesController.searchMovie)
router.get('/page/:page', moviesController.getAllMovie)
router.get('/:id', moviesController.getMovieById)
router.put('/update/:id', moviesController.updateMovie)
router.delete('/delete', moviesController.deleteMovie)

module.exports = router;