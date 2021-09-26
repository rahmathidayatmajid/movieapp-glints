const router = require('express').Router()
    , movie_category = require('../controllers/movies_genre')

router.post('/', movie_category.movieCategory)
router.delete('/', movie_category.removeCategory)

module.exports = router;