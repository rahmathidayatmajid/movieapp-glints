const router = require('express').Router(),
    watchlist = require('../controllers/watchlist'),
    auth = require('../middlewares/auth')

router.post('/:id', auth, watchlist.addWatchlist)
router.delete('/delete', auth, watchlist.deleteWatchlist)

module.exports = router;