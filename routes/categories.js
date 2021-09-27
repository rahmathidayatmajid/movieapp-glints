const categoryController = require('../controllers/categoriesController')
const router = require('express').Router()

router.post('/add', auth, authAdmin, categoryController.postGenre)
router.get('/', categoryController.getGenre)
router.get('/genre/:id', categoryController.getAllMovie)
router.delete('/:id', auth, authAdmin, categoryController.deleteGenre)

module.exports = router;