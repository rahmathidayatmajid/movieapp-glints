const CountRating= require('../controllers/countRating')
const router = require('express').Router()

router.get('/:id', CountRating.movieRating )

module.exports = router;