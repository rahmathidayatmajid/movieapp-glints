const { Review, User } = require('../models')
const model = require('../models/index')
const { Movie } = require('../models')
const Sequelize = require('sequelize')
const joi = require('joi')


module.exports = {
    create: async(req, res) => {
        model.sequelize.transaction({
            autocommit: false,
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        }).then(async(transaction) => {
            const body = req.body
            const movieid = req.params.id
            const user = req.user
            try {
                const schema = joi.object({
                    rating: joi.number().min(0).max(5).required(),
                    comment: joi.string().required(),
                    movieId: joi.number()
                })
                const { error } = schema.validate({...body }, { abortEarly: false })
                if (error) {
                    transaction.rollback()
                    return res.status(400).json({
                        status: "failed",
                        message: "fields cannot be empty to add review",
                        error: error['details'][0]["message"]
                    })
                }
                const checkUser = await Review.findOne({ where: { userId: user.id, movieId: movieid } })
                if (checkUser) {
                    return res.status(400).json({
                        status: "failed",
                        message: "You already add review"
                    })
                }

                const createReview = await Review.create({
                    rating: body.rating,
                    comment: body.comment,
                    movieId: movieid,
                    userId: user.id
                }, { transaction })

                const avarageRating = await Review.findAll({
                    where: {
                        movieId: movieid
                    }
                }, { transaction })

                let ratarata = avarageRating.map(e => {
                    return e.dataValues.rating
                })
                ratarata.push(body.rating)

                const sum = ratarata.reduce((a, b) => a + b)
                const reviewAsli = Math.round(sum / ratarata.length)

                const updateMovie = await Movie.update({
                    ...body,
                    rating: reviewAsli,
                }, {
                    where: {
                        id: movieid
                    }
                }, { transaction })


                if (!updateMovie[0]) {
                    transaction.rollback()
                    return res.status(400).json({
                        status: "failed",
                        message: "Unable to update database",
                    });
                }
                transaction.commit()
                res.status(200).json({
                    status: "success",
                    message: "success add review to movie"
                })
                console.log("commit")

            } catch (error) {
                transaction.rollback()
            }
        })
    },
    update: async(req, res) => {
        model.sequelize.transaction({
            autocommit: false,
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        }).then(async(transaction) => {
            const body = req.body
            const movieid = req.params.id
            const user = req.user
            try {
                const checkReview = await Review.findOne({ where: { userId: user.id, movieId: movieid } })
                if (!checkReview) {
                    transaction.rollback()
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find review to update"
                    })
                }
                const updateReview = await Review.update({
                    rating: body.rating,
                    comment: body.comment
                }, {
                    where: { userId: user.id, movieId: checkReview.dataValues.movieId }
                }, { transaction })

                const getAllReview = await Review.findAll({
                    where: { movieId: movieid }
                }, { transaction })

                let ratarata = getAllReview.map(e => e.dataValues.rating)
                const sum = ratarata.reduce((a, b) => a + b)
                const reviewAsli = Math.round(sum / ratarata.length)

                const updateMovie = await Movie.update({
                    ...body,
                    rating: reviewAsli
                }, {
                    where: {
                        id: movieid
                    }
                }, { transaction })

                if (!updateMovie[0]) {
                    transaction.rollback()
                    return res.status(400).json({
                        status: "failed",
                        message: "Unable to update database",
                    });
                }
                transaction.commit()
                res.status(200).json({
                    status: "success",
                    message: "success update review"
                })

            } catch (error) {
                transaction.rollback()
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                })
            }
        })
    },
    getAllReviewByMovie: async(req, res) => {
        const id = req.params.id
        const load = req.params.load
        try {
            if (load <= 6) {
                const limit = 6
                const findReview = await Review.findAll({
                    where: {
                        movieId: id
                    },
                    include: {
                        model: User,
                        attributes: ['fullName', 'profilePict']
                    },
                    limit: limit,
                    offset: 0
                })

                if (!findReview) {
                    return res.status(400).json({
                        status: "failed",
                        message: "there's no review yet in this movie"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findReview
                })
            } else {
                const findReview = await Review.findAll({
                    where: {
                        movieId: id
                    },
                    include: {
                        model: User,
                        attributes: ['fullName', 'profilePict']
                    }
                })

                if (!findReview) {
                    return res.status(400).json({
                        status: "failed",
                        message: "there's no review yet in this movie"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findReview
                })
            }

        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: "Internal Server Error"
            })
        }
    },
    getShareReviewOfUser: async(req, res) => {
        const id = req.params.id
        try {
            const findReview = await Review.findAll({ where: { userId: id } })
            if (!findReview) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'User havent review any movies',
                    data: []
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'success retrieved data',
                data: findReview
            })

        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: "Internal Server Error"
            })
        }
    },
    delete: async(req, res) => {
        const user = req.user
        const id = req.params.id
        try {
            const deleteReview = await Review.delete({
                where: {
                    userId: user.id,
                    movieId: id
                }
            })
            if (!deleteReview) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot delete review or not own review"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Success deleted your review"
            })

        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: "Internal Server Error"
            })
        }
    }
}