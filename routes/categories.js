const categoryController = require('../controllers/categoriesController')
const router = require('express').Router()
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

router.post('/add', auth, authAdmin, categoryController.postGenre)
router.get('/', categoryController.getGenre)
router.delete('/:id', auth, authAdmin, categoryController.deleteGenre)

module.exports = router;