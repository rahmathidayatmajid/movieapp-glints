const characterController = require('../controllers/charactersControllers')
const router = require('express').Router()
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const uploadCharacter = require('../middlewares/uploadCharacter')

router.post('/add', auth, uploadCharacter('profilePict'), authAdmin, characterController.postActor)
router.get('/', characterController.getActor)
router.put('/:id', auth, uploadCharacter('profilePict'), authAdmin, characterController.updateActor)
router.delete('/:id', auth, authAdmin, characterController.deleteActor)

module.exports = router;