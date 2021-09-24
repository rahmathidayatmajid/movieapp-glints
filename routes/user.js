const router = require('express').Router()
const user = require('../controllers/usersController')
    //router

router.post('/signup', user.signUp)
router.put('/:id', user.editUserBasic)
router.put('/:id', user.editUserByAdmin)
router.get('/:id', user.getOneUser)






module.exports = router;