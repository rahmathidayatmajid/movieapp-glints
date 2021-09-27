const review = require('../controllers/reviewController')
const router = require('express').Router()

router.post('/:id', review.create)
router.put('/:id', review.update)
router.get('/movie/:id', review.getAllReviewByMovie)
router.get('/share/:id', review.getShareReviewOfUser)


module.exports = router;