const router = require('express').Router()
    , movie_character = require('../controllers/movies_character')

router.post('/', movie_character.movieCharacter)
router.delete('/', movie_character.removeCharacter)

module.exports = router;