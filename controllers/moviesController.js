const { Movie, Character, MovieCharacter, Review, User, MovieCategory, Category } = require('../models')
    , { Op } = require('sequelize')

module.exports = {
    postMovie: async (req, res) => {
        const body = req.body;
        const file = req.files;

        try {
           const movies = await Movie.create({
                title: body.title,
                synopsis: body.synopsis,
                release_date: body.release_date,
                budget: body.budget,
                director: body.director,
                featured_song: body.featured_song
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
            console.log("🚀 ~ file: moviesController.js ~ line 34 ~ postMovie: ~ error", error)
            
            res.status(500).json({
              status: 'error',
              message: 'Internal Server Error'
            });
        }
    },
    searchMovie:  async (req, res) => {   
        let { q_name } = req.params;   

        try {
           const movies = await Movie.findAll({
               where: {
                 title: {
                     [Op.iLike]: '%'+ q_name + '%'
                 }  
               },
               attributes: { exclude: ['createdAt', 'updatedAt'] },
               include: [
                   {
                       model: MovieCharacter,
                       attributes: ['characterId'],
                       include: {
                           model: Character,
                           attributes: ['name']
                       }
                   }
               ]
           });

           if (!movies) {
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
        console.log("🚀 ~ file: moviesController.js ~ line 45 ~ getMovie: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    getMovie:  async (req, res) => {   
        try {
            const movies = await Movie.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                    model: MovieCategory,
                    attributes: ['categoryId'],
                    include:{
                            model: Category,
                            attributes: ['name']
                        } 
                },
                {
                    model: MovieCharacter,
                    attributes: ['characterId'],
                    include: {
                        model: Character,
                        attributes: ['name']
                    }
                }
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
            console.log("🚀 ~ file: moviesController.js ~ line 45 ~ getMovie: ~ error", error)
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
              })
        }
    },
        
    getMovieById: async (req, res) => {
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
        console.log("🚀 ~ file: moviesController.js ~ line 124 ~ getMovieById: ~ error", error)
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
          })
        }
    },


    //get movies by category, by Id
}