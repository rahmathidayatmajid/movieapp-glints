const { Category, Movie, MovieCategory } = require('../models')

module.exports = {
    movieCategory: async (req, res) => {
        const movieId = req.body.movieId;
        console.log("🚀 ~ file: movies_genre.js ~ line 6 ~ movieCategory: ~ movieId", movieId)
        
        const categoryId = req.body.categoryId;
        console.log("🚀 ~ file: movies_genre.js ~ line 9 ~ movieCategory: ~ categoryId", categoryId)

        try {
            const check = await MovieCategory.findOne({ where: { movieId, categoryId } });
            console.log("🚀 ~ file: movies_genre.js ~ line 13 ~ movieCategory: ~ check", check)

            if (check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to category movie'
                });
            }

            const movieCategory = await MovieCategory.create({
                movieId: movieId,
                categoryId: categoryId
            });
            console.log("🚀 ~ file: movies_genre.js ~ line 26 ~ movieCategory: ~ movieCategory", movieCategory)
            

            if (!movieCategory) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add to character movie, please try again'
                });
            }

            const response = await Movie.findOne({
                where : { id: movieId },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: MovieCategory,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: Category,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });
            
            res.status(200).json({
                status: 'Success',
                message: 'Added successfully',
                data: {
                    movie: response
                }
            });
        } catch (error) {
            console.log("🚀 ~ file: movies_genre.js ~ line 62 ~ movieCategory: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    removeCategory: async (req, res) => {
        const movieId = req.body.movieId;
        const categoryId = req.body.categoryId;

        try {
            const check = await MovieCategory.findOne({ 
                where: {
                    movieId, categoryId
                }
            });

            if(!check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Not added to category movie yet'
                });
            }

            const movieCategory = await MovieCategory.destroy({
                where: { movieId, categoryId}
            });

            if (!movieCategory) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to remove category movie, please try again'
                });
            }

            const response = await Movie.findOne({
                where : { id: movieId },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: MovieCategory,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: Category,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });
            res.status(200).json({
                status: 'Success',
                message: 'Removed successfully',
                data: {
                    movie: response
                }
            })
        } catch (error) {
        console.log("🚀 ~ file: movies_genre.js ~ line 75 ~ removeCategory: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}