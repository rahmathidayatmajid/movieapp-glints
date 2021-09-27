const router = require('express').Router()
    , movie_category = require('../controllers/movies_genre')

router.post('/add', movie_category.movieCategory)
router.delete('/delete', movie_category.removeCategory)

module.exports = router;