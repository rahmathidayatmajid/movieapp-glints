const router = require('express').Router()
const user = require('../controllers/usersController')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const upload = require('../middlewares/uploadCloudinary')
    //router
router.post('/signin', user.signIn)
router.post('/signup', user.signUp)
router.put('/', auth, upload('profilePict'), user.editUserBasic)
router.put('/:id', auth, authAdmin, user.editUserByAdmin)
router.get('/:id', auth, user.getOneUser)
router.get('/user-profile', auth, user.userLogin)






module.exports = router;