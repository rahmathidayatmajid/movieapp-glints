const characterController = require('../controllers/charactersControllers')
const router = require('express').Router()

router.post('/add', characterController.postActor)
router.get('/', characterController.getActor)
router.delete('/:id', characterController.deleteActor)

module.exports = router;
