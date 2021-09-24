const Joi = require('joi')
    , { Movie, Character, MovieCharacter, Review, User } = require('../models')

module.exports = {
    postMovie: async (req, res) => {
        const body = req.body;
        const file = req.files;

        try {
           const movies = await Movie.create({
                title: body.title,
                storyline: body.storyline,
                // rating : Review['rating']
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
    getMovie:  async (req, res) => {        
        try {
            const movies = await Movie.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt', 'poster', 'trailer'] },
                include: [
                    {
                        model: Review, 
                        attributes: ['rating'],
                        // include: [
                        //     {
                        //         model: User,
                        //         attributes: { exclude: ['createdAt', 'updatedAt', 'isAdmin', 'profilePict' ] }
                        //     }
                        // ]
                    }
                    
                ]
            })
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
}