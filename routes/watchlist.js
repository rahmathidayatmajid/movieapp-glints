const router = require('express').Router(),
    watchlist = require('../controllers/watchlist'),
    auth = require('../middlewares/auth')

router.post('/add', auth, watchlist.addWatchlist)
router.delete('/', auth, watchlist.deleteWatchlist)

module.exports = router;