const characterController = require('../controllers/charactersControllers')
const router = require('express').Router()
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const upload = require('../middlewares/uploadCloudinary')

router.post('/add', auth, upload('profilePict'), authAdmin, characterController.postActor)
router.get('/', characterController.getActor)
router.delete('/:id', auth, authAdmin, characterController.deleteActor)

module.exports = router;