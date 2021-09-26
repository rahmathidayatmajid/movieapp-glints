const router = require('express').Router()
    , movie_character = require('../controllers/movies_character')

router.post('/add', movie_character.movieCharacter)
router.delete('/delete', movie_character.removeCharacter)

module.exports = router;