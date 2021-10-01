const { Movie, Character, MovieCharacter, Review, User, MovieCategory, Category } = require('../models'), { Op } = require('sequelize')

module.exports = {
    postMovie: async(req, res) => {
        const body = req.body;
        const file = req.file;

        try {
            const checkMovie = await Movie.findOne({
                where: {
                    title: body.title,
                    release_date: body.release_date
                }
            })

            if (checkMovie) {
                return res.status(400).json({
                    status: "failed",
                    message: "Already insert movie! please dont insert same movie"
                })
            }
            const movies = await Movie.create({
                title: body.title,
                synopsis: body.synopsis,
                release_date: body.release_date,
                budget: body.budget,
                director: body.director,
                featured_song: body.featured_song,
                poster: file.path,
                trailer: body.trailer
            });

            if (!movies) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add movies, please try again'
                });
            }
            return res.status(200).json({
                status: 'Success',
                message: 'Succesfully insert movie',
                data: movies
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
    searchMovie: async(req, res) => {
        let { q_name } = req.params;

        try {
            const movies = await Movie.findAll({
                where: {
                    title: {
                        [Op.iLike]: '%' + q_name + '%'
                    }
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: MovieCharacter,
                    attributes: ['characterId'],
                    include: {
                        model: Character,
                        attributes: ['name']
                    }
                }]
            });

            if (movies.length === 0) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'There is no movie found'
                })
            }

            res.status(200).json({
                status: 'Success',
                message: 'Movies loaded successfully',
                data: {
                    movies
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },
    getAllMovie: async(req, res) => {
        const limit = 10;
        const page = req.params.page;
        const offset = limit * (page - 1);
        try {
            const movies = await Movie.findAll({
                limit: limit,
                offset: offset,
                attributes: ['poster', 'title'],
                include: [{
                    model: MovieCategory,
                    attributes: ['categoryId'],
                    include: {
                        model: Category,
                        attributes: ['name']
                    }
                }],
                order: [
                    ['id', 'ASC']
                ]
            });
            res.status(200).json({
                status: 'Success',
                message: 'Movies loaded successfully',
                data: {
                    movies
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
    getMovieById: async(req, res) => {
        const { id } = req.params;

        try {
            const movie = await Movie.findOne({
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: MovieCharacter,
                    attributes: ['characterId'],
                    include: {
                        model: Character,
                        attributes: ['name']
                    }
                }
            });

            if (!movie) {
                return res.status(400).json({
                    status: 'failed',
                    message: `No movie found with id ${id}`
                });
            }

            res.status(200).json({
                status: 'Success',
                message: 'Movies loaded successfully',
                data: { movie }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            })
        }
    },

    updateMovie: async(req, res) => {
        const { id } = req.params;
        console.log(req.file, "test")
        const poster = req.file ? req.file.path : req.body.poster
        const { title, synopsis, release_date, budget, director, featured_song, trailer } = req.body

        try {
            const updateMovie = await Movie.update({
                title,
                synopsis,
                release_date,
                budget,
                director,
                featured_song,
                poster,
                trailer
            }, {
                where: { id }
            });

            if (!updateMovie) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to update movie, please try again'
                });
            }

            const response = await Movie.findOne({
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: MovieCharacter,
                    attributes: ['characterId'],
                    include: {
                        model: Character,
                        attributes: ['name']
                    },
                    order: [
                        ['name', 'ASC']
                    ]
                }]
            });

            res.status(200).json({
                status: 'Success',
                message: 'Movies update successfully',
                data: response
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },
    deleteMovie: async(req, res) => {
        const { id } = req.params;

        try {
            const movie = await Movie.findOne({
                where: { id }
            });

            if (!movie) {
                return res.status(400).json({
                    status: 'failed',
                    message: `No movie with id ${id} found`
                })
            }

            const remove = await Movie.destroy({ where: { id } });

            if (!remove) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Failed to delete the movie'
                })
            }

            res.status(200).json({
                status: 'Success',
                message: 'Success delete movie'
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },
    getAllMovieByCategory: async(req, res) => {
        const limit = 10;
        const page = req.params.page;
        const offset = limit * (page - 1);
        const category = req.params.category
        try {
            const getMovie = await Movie.findAll({
                include: {
                    model: MovieCategory,
                    attributes: ['categoryId'],
                    include: {
                        model: Category,
                        where: {
                            name: {
                                [Op.iLike]: "%" + category + "%"
                            }
                        }
                    }
                },
                limit: limit,
                offset: offset
            })

            if (!getMovie) {
                return res.status(400).json({
                    status: "failed",
                    message: "There no movie where category like that"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: getMovie
            })

        } catch (error) {

            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}