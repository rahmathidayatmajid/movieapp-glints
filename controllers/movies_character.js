const { Character, Movie, MovieCharacter } = require('../models')

module.exports = {
    movieCharacter: async (req, res) => {
        const movieId = req.body.movieId;
        console.log("🚀 ~ file: movie_character.js ~ line 6 ~ movieCharacter: ~ movieId", movieId)
        const characterId = req.body.characterId;
        console.log("🚀 ~ file: movie_character.js ~ line 7 ~ movieCharacter: ~ characterId", characterId)

        try {
            const check = await MovieCharacter.findOne({ where: { movieId, characterId } });
            console.log("🚀 ~ file: movie_character.js ~ line 11 ~ movieCharacter: ~ check", check)

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
            console.log("🚀 ~ file: movie_character.js ~ line 22 ~ movieCharacter: ~ movieCharacter", movieCharacter)

            if (!movieCharacter) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add to character movie, please try again'
                });
            }

            const response = await Movie.findOne({
                where: { id: movieId },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: MovieCharacter,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: Character,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });
            console.log("🚀 ~ file: movie_character.js ~ line 44 ~ movieCharacter: ~ response", response)
            res.status(200).json({
                status: 'Success',
                message: 'Added successfully',
                data: {
                    movie: response
                }
            });
        } catch (error) {
            console.log("🚀 ~ file: movie_character.js ~ line 55 ~ movieCharacter: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    removeCharacter: async (req, res) => {
        const movieId = req.body.movieId;
        const characterId = req.body.characterId;

        try {
           const check = await MovieCharacter.findOne({
               where: { movieId, characterId }
           });
           
           if(!check) {
               return res.status(400).json({
                   status: 'failed',
                   message: 'Not added to character movie yet'
               });
           }

           const movieCharacter = await MovieCharacter.destroy({
               where: { movieId, characterId }
           });

           if (!movieCharacter) {
               return res.status(400).json({
                   status: 'failed',
                   message: 'Failed to remove character movie, please try'
               });
           }

           const response = await Movie.findOne({
               where: { id: movieId },
               attributes: { exclude: ['createdAt', 'updatedAt'] },
               include: [
                   {
                       model: MovieCharacter,
                       attributes: { exclude: ['createdAt', 'updatedAt'] },
                       include: [
                           {
                               model: Character,
                               attributes: ['name']
                           }
                       ]
                   }
               ]
           });

           res.status(200).json({
               status: 'Success',
               message: 'Removed Successfully',
               data: {
                   movie: response
               }
           });
        } catch (error) {
        console.log("🚀 ~ file: movies_character.js ~ line 72 ~ removeCharacter: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}