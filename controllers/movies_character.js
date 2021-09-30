const { Character, Movie, MovieCharacter } = require('../models')

module.exports = {
    movieCharacter: async(req, res) => {
        const movieId = req.body.movieId;
        const characterId = req.body.characterId;


        try {
            const check = await MovieCharacter.findOne({ where: { movieId, characterId } });

            if (check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to character movie'
                });
            }

            const movieCharacter = await MovieCharacter.create({
                movieId: movieId,
                characterId: characterId
            });

            if (!movieCharacter) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add to character movie, please try again'
                });
            }

            const response = await Movie.findOne({
                where: { id: movieId },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: MovieCharacter,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Character,
                        attributes: ['name']
                    }]
                }]
            });
            res.status(200).json({
                status: 'Success',
                message: 'Added successfully',
                data: {
                    movie: response
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    removeCharacter: async(req, res) => {
        const id = req.params.id

        try {
            const check = await MovieCharacter.findOne({
                where: { id }
            });

            if (!check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Not added to character movie yet'
                });
            }

            const movieCharacter = await MovieCharacter.destroy({
                where: { id }
            });

            if (!movieCharacter) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to remove character movie, please try'
                });
            }
            res.status(200).json({
                status: 'Success',
                message: 'Removed Successfully',
            });
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}