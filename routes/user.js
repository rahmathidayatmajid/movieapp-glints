const router = require('express').Router()
const user = require('../controllers/usersController')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const upload = require('../middlewares/uploadCloudinary')
    //router
router.post('/signin', user.signIn)
router.post('/signup', user.signUp)
router.put('/edit/me', auth, upload('profilePict'), user.editUserBasic)
router.put('/edit/user/:id', auth, authAdmin, user.editUserByAdmin)
router.get('/getuser/:id', auth, user.getOneUser)
router.get('/profile', auth, user.getUserLogin)






module.exports = router;