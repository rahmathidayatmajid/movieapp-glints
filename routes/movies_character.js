const router = require('express').Router(),
    movie_character = require('../controllers/movies_character'),
    auth = require('../middlewares/auth'),
    authAdmin = require('../middlewares/authAdmin')

router.post('/add', auth, authAdmin, movie_character.movieCharacter)
router.delete('/delete', auth, authAdmin, movie_character.removeCharacter)

module.exports = router;