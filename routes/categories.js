const categoryController = require('../controllers/categoriesController')
const router = require('express').Router()

router.post('/add', categoryController.postGenre)
router.get('/', categoryController.getGenre)
router.delete('/:id', categoryController.deleteGenre)

module.exports = router;
