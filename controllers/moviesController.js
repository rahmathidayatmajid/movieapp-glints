const Joi = require('joi')
    , { Movie, Character, MovieCharacter } = require('../models')

module.exports = {
    postMovie: async (req, res) => {
        const body = req.body;
        const file = req.files;

        try {
            const schema = Joi.object({
                title: Joi.string().required(),
                rating: Joi.number().required(),
                storyline: Joi.string().required(),
                poster: Joi.string().required,
                trailer: Joi.string().required()
            });

            const { error } = schema.validate(
                {
                    ...req.body,
                    poster: file.poster ? file.poster[0].path : null,
                    trailer: file.trailer ? file.trailer[0].path : null
                },
                { abortEarly: false }
            );

            if(error) {
                return res.status(400).send({
                    status: 'failed',
                    message: error.details[0].message,
                    error: error.details.map(detail => detail.message)
                });
            }

            const movies = await Movie.create({
                title: body.title,
                storyline: body.storyline,
                rating: body.rating,
                poster: file.poster[0].path,
                trailer: file.trailer[0].path
            });

            if (!movies) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add movies, please try again'
                });
            }
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
                        model: MovieCharacter, 
                        attributes: ['movieId', 'characterId'],
                        include: [
                            {
                                model: Character,
                                as: "actor",
                                attributes: ['name']
                            }
                        ]
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