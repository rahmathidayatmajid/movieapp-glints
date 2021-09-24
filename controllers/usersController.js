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
                    password: hash,
                    isAdmin: false
                })

                return res.status(200).json({
                    status: "Success",
                    message: "Register successfully",
                })
            })

        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    editUserBasic: async(req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const findUser = await User.findOne({ where: { id: id } })
            if (!findUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "User not found"
                })
            }
            const edit = await User.update({
                email: body.email,
                password: body.password,
                fullName: body.fullName,
                profilePict: body.profilePict,
                isAdmin: false
            }, {
                where: {
                    id: id
                }
            })

            if (!edit) {
                res.status(400).json({
                    status: "failed",
                    message: "Cannot Update Data"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success updated data"
            })

        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    editUserByAdmin: async(req, res) => {
        const id = req.params.id
        try {
            const findUser = await User.findOne({ where: { id: id } })
            if (!findUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "User not found"
                })
            }
            const edit = await User.update({
                email: body.email,
                password: body.password,
                fullName: body.fullName,
                profilePict: body.profilePict,
                isAdmin: body.isAdmin
            }, {
                where: {
                    id: id
                }
            })

            if (!edit) {
                res.status(400).json({
                    status: "failed",
                    message: "Cannot Update Data"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success updated data"
            })

        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    getOneUser: async(req, res) => {
        const user = req.user
        try {
            const data = await User.findOne({
                where: {
                    id: user.id
                }
            })

            res.send(data)

        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    }
}