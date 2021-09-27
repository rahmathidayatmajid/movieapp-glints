const { Review } = require('../models')
const model = require('../models/index')
const { Movie } = require('../models')


module.exports = {
    create: async(req, res) => {
        model.sequelize.transaction(async transaction => {
            const body = req.body
            const user = req.params.id
            try {
                const checkUser = await Review.findOne({
                    where: {
                        userId: user,
                        movieId: body.movieId
                    }
                })
                if (checkUser) {
                    return res.status(400).json({
                        status: "failed",
                        message: "already insert a review to this movie"
                    })
                }
                const createReview = await Review.create({
                    rating: body.rating,
                    comment: body.comment,
                    movieId: body.movieId,
                    userId: user
                }, { transaction })

                const avarageRating = await Review.findAll({
                    where: {
                        movieId: createReview.dataValues.movieId
                    }
                }, { transaction }).then(result => {
                    console.log(result)
                    let test = result.map(e => {
                        return e.dataValues.rating
                    })
                    if (!test.length) {
                        test = createReview.dataValues.rating
                        return test
                    }
                    console.log('ini test yang di map ' + test)
                    const sum = test.reduce((a, b) => a + b)
                    const reviewAsli = Math.round(sum / test.length)
                    result = reviewAsli
                    console.log('ini result yang udah dibagi ' + result)
                    return result
                })

                console.log("🚀 ~ file: reviewController.js ~ line 42 ~ create:async ~ avarageRating", avarageRating)

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
                console.log(error)
                transaction.rollback()
            }
        })
    },

}