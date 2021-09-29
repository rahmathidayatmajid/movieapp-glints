const review = require('../controllers/reviewController')
const router = require('express').Router()
const auth = require('../middlewares/auth')

router.post('/:id', auth, review.create)
router.put('/:id', auth, review.update)
router.delete('/:id', auth, review.delete)
router.get('/movie/:id/:load', review.getAllReviewByMovie)
router.get('/share/:id', review.getShareReviewOfUser)


module.exports = router;