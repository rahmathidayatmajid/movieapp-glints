const router = require('express').Router()
const user = require('../controllers/usersController')
    //router

router.post('/signup', user.signUp)





module.exports = router;