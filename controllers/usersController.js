const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const joi = require('joi')
require('dotenv').config()

module.exports = {
    signUp: async(req, res) => {
        const body = req.body
        try {
            const schema = joi.object({
                fullName: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required()
            })

            const { error } = schema.validate({
                fullName: body.fullName,
                email: body.email,
                password: body.password
            }, { abortEarly: false })

            const checkEmail = await User.findOne({ where: { email: body.email } })
            if (checkEmail) {
                return res.status(400).json({
                    status: "failed",
                    message: "email already used"
                })
            }

            bcrypt.hash(body.password, 10, async(err, hash) => {
                const createUser = await User.create({
                    fullName: body.fullName,
                    email: body.email,
                    password: hash
                })

                return res.status(200).json({
                    status: "Success",
                    message: "Register successfully"
                })
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    }
}