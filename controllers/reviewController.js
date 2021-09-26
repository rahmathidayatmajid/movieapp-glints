const { Review } = require('../models')
const model = require('../models/index')
const { Movie } = require('../models')


module.exports = {
    create: async(req, res) => {
        model.sequelize.transaction(async transaction => {
            const body = req.body
            const user = req.user
            try {
                const checkUser = await Review.findOne({
                    where: {
                        userId: user.id,
                        movieId: body.movieId
                    }
                }).catch(err => {
                    if (err) {
                        res.status(400).json({
                            status: 'failed',
                            message: 'You already Have Review in this movie'
                        })
                        transaction.rollback()
                    }
                })

                const createReview = await Review.create({
                    rating: body.rating,
                    comment: body.comment,
                    movieId: body.movieId,
                    userId: user.id
                }, { transaction }).catch(err => {
                    if (err) {
                        res.status(400).json({
                            status: 'failed',
                            message: 'Cannot insert data'
                        })
                        transaction.rollback()
                    }
                })

                const avarageRating = await Review.findAll({
                    where: {
                        movieId: createReview.dataValues.movieId
                    }
                }, { transaction }).then(result => {
                    const test = result.map(e => {
                        return e.dataValues.rating
                    })
                    const sum = test.reduce((a, b) => a + b)
                    const reviewAsli = Math.round(sum / test.length)
                    result = reviewAsli
                    return result

                }).catch(err => {
                    console.log(err)
                    transaction.rollback()
                })

                console.log(avarageRating)

                const updateMovie = await Movie.update({
                    ...body,
                    rating: avarageRating,
                }, {
                    where: {
                        id: createReview.dataValues.movieId
                    }
                }, { transaction })


                if (!updateMovie[0]) {
                    return res.status(400).json({
                        status: "failed",
                        message: "Unable to update database",
                    });
                }

                res.status(200).json({
                    status: "success",
                    message: "success add review to movie"
                })
                console.log("commit")
                transaction.commit()
            } catch (error) {
                transaction.rollback()
            }
        })
    },
    update: async(req, res) => {
        model.sequelize.transaction(async transaction => {
            const body = req.body
            const user = req.user
            const id = req.params.id
            try {
                // ============================================================
                // update si review yang di klik user
                // ============================================================

                const update = await Review.update({
                    ...body,
                    where: {
                        id: id,
                        userId: user.id
                    }
                }, { transaction }).catch(err => {
                    if (err) {
                        res.status(400).json({
                            status: "failed",
                            message: "cannot update review"
                        })
                    }
                })

                // ============================================================
                // cari semua review dan hitung rata rata rating
                // ============================================================

                const avarageRating = await Review.findAll({
                    where: {
                        movieId: update.dataValues.movieId
                    }
                }, { transaction }).then(result => {
                    const test = result.map(e => {
                        return e.dataValues.rating
                    })
                    const sum = test.reduce((a, b) => a + b)
                    const reviewAsli = Math.round(sum / test.length)
                    result = reviewAsli
                    return result

                }).catch(err => {
                    console.log(err)
                    transaction.rollback()
                })

                // ============================================================
                // update rating yang sudah dirata rata ke movie
                // ============================================================

                const updateMovie = await Movie.update({
                    ...body,
                    rating: avarageRating,
                    where: {
                        id: update.dataValues.movieId
                    }
                }, { transaction })

                if (!updateMovie[0]) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot update review movie"
                    })
                }

                res.status(200).json({
                    status: "success",
                    message: "success update review"
                })



                console.log('commit')
                transaction.commit()

            } catch (error) {
                transaction.rollback()
            }
        })
    },
    getAllReview: (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Internal Server"
            })
        }
    }
}