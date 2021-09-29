const router = require('express').Router()
const user = require('../controllers/usersController')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const uploadProfile = require('../middlewares/uploadProfile')
    //router
router.post('/signin', user.signIn)
router.post('/signup', user.signUp)
router.put('/', auth, uploadProfile('profilePict'), user.editUserBasic)
router.put('/:id', auth, authAdmin, user.editUserByAdmin)
router.get('/:id', auth, user.getOneUser)






module.exports = router;