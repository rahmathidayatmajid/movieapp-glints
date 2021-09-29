const moviesController = require('../controllers/moviesController');
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const router = require('express').Router()
const moviePoster = require('../middlewares/uploadMoviePoster')

router.post('/add', auth, moviePoster('poster'), authAdmin, moviesController.postMovie) //ok
router.get('/search/:q_name', moviesController.searchMovie)
router.get('/page/:page', moviesController.getAllMovie)
router.get('/:id', moviesController.getMovieById)
router.put('/update/:id', auth, authAdmin, moviesController.updateMovie) //ok
router.delete('/:id', auth, authAdmin, moviesController.deleteMovie) //ok
router.get('/:category/page/:page', moviesController.getAllMovieByCategory)


module.exports = router;