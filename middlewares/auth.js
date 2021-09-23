const jwt = require('jsonwebtoken')

//===============================================================================================================
//
//           tinggal pake dan import di router
//
//===============================================================================================================

module.exports = async(req, res, next) => {
    const bearerToken = req.header('Authorization')
    try {
        const token = bearerToken.replace("Bearer ", "")
        const decode = jwt.verify(token, process.env.PWD_TOKEN)
        req.user = decode
        next()
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Please Log in or register"
        })
    }
}