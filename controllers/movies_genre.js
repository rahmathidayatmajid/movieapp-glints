const { Category, Movie, MovieCategory } = require('../models')

module.exports = {
    movieCategory: async (req, res) => {
        const movieId = req.body.movieId;
        const categoryId = req.body.categoryId;

        try {
            const check = await MovieCategory.findOne({ where: { movieId, categoryId } });

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
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}