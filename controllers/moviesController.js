const { Movie, Character, MovieCharacter, Review, User } = require('../models'), { Op } = require('sequelize')

module.exports = {
    postMovie: async(req, res) => {
        const body = req.body;
        const file = req.files;

        try {
            const movies = await Movie.create({
                title: body.title,
                storyline: body.storyline,
                // poster: file.path,
                // trailer: file.path
            });
            console.log("🚀 ~ file: moviesController.js ~ line 42 ~ postMovie: ~ movies", movies)

            if (!movies) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add movies, please try again'
                });
            }
            return res.status(200).json({
                status: 'Success',
                message: 'Succesfully insert data',
                data: movies
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                error: {
                    message: 'Internal Server Error',
                }
            });
        }
    },
    getMovie: async(req, res) => {
        const { id: movieId } = req.params
        console.log("🚀 ~ file: moviesController.js ~ line 40 ~ getMovie: ~ movieId", movieId)
        try {
            const movies = await Movie.findOne({
                where: {
                    id: {
                        [Op.eq]: movieId
                    } //movie id
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'poster', 'trailer'] },
                include: [{
                        model: Review,
                        // where: {
                        //     movieId: id
                        // },
                        attributes: ['rating', 'comment']
                    }

                ]
            })
            console.log("🚀 ~ file: moviesController.js ~ line 58 ~ getMovie: ~ movies", movies)
                //const reviews = get(movie, 'review', [])
            res.send(movies)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'error',
                error: {
                    message: 'Internal Server Error',
                },
            });
        }
    }

    //get movies by category, by Id
}