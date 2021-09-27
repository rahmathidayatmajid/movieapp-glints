const router = require('express').Router(),
    movie_category = require('../controllers/movies_genre'),
    auth = require('../middlewares/auth'),
    authAdmin = require('../middlewares/authAdmin')

router.post('/add', auth, authAdmin, movie_category.movieCategory)
router.delete('/delete', auth, authAdmin, movie_category.removeCategory)

module.exports = router;