const router = require('express').Router()
    , watchlist = require('../controllers/watchlist')

router.post('/add', watchlist.addWatchlist)
router.delete('/', watchlist.deleteWatchlist)

module.exports = router;