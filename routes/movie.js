const moviesController = require('../controllers/moviesController');
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const router = require('express').Router()
const moviePoster = require('../middlewares/uploadMoviePoster')

router.post('/add', auth, moviePoster('poster'), authAdmin, moviesController.postMovie)
router.get('/search/:q_name', moviesController.searchMovie)
router.get('/page/:page', moviesController.getAllMovie)
router.get('/:id', moviesController.getMovieById)
router.put('/update/:id', auth, authAdmin, moviesController.updateMovie)
router.delete('/delete', auth, authAdmin, moviesController.deleteMovie)


module.exports = router;