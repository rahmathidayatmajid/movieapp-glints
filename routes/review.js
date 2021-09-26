const review = require('../controllers/reviewController')
const router = require('express').Router()

router.post('/:id', review.create)

module.exports = router;