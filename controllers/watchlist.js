const { User, Movie, Watchlist } = require('../models')

module.exports = {
    addWatchlist: async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        
        try {
            const check = await Watchlist.findOne({ 
                where: {
                    movieId: id,
                    userId
                 }
            });

            if (check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to watchlist'
                });
            }

            const watchlist = await Watchlist.create({
                movieId: id,
                userId
            });

            if (!watchlist) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to add movie to watchlist, please try again'
                });
            }

            const response = await User.findOne({
                where: {
                    id: userId
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
                include: {
                    model: Movie,
                    attributes: { exclude: ['createdAt', 'uodatedAt'] }
                }
            });

            res.status(200).json({
                status: 'Success',
                message: 'Movie added to watchlist',
                data: {
                    user: response
                }
            });
        } catch (error) {
        console.log("🚀 ~ file: watchlist.js ~ line 11 ~ addWatchlist: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server eror'
            })
        }
    },

    deleteWatchlist: async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const check = await Watchlist.findOne({ where: { movieId: id, userId } });

            if (!check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Not added to watchlist yet'
                });
            }

            const watchlist = await Watchlist.destroy({  where: { movieId: id, userId } });
            if (!watchlist) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Failed to remove movie from watchlist'
                });
            }

            const response = await User.findOne({
                where: {
                    id: userId
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
                include: {
                    model: Movie,
                    attributes: { exclude: ['createdAt', 'uodatedAt'] }
                }
            });

            res.status(200).json({
                status: 'Success',
                message: 'Movie added to watchlist',
                data: {
                    user: response
                }
            });
        } catch (error) {
        console.log("🚀 ~ file: watchlist.js ~ line 69 ~ deleteWatchlist: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}