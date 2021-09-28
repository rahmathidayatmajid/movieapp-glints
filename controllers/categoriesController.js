const { Category, MovieCategory, Movie } = require('../models');

module.exports = {
    postGenre : async (req, res) => {
        const name = req.body.name;

        try {
            const check = await Category.findOne({ where: { name } });
            
            if (check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to category'
                });
            }
            const genre = await Category.create({
                name
            });

            if(!genre) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Cannot insert data genre'
                })
            }

            return res.status(200).json({
                status: 'Success',
                message: 'Successfully insert data genre'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    getGenre: async (req, res) => {
        try {
            const genre = await Category.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
            if(!genre) {
                return res.status(400).json({
                    status: "failed",
                    massage: "Data not found"
                });
            }
            res.status(200).json({
                status: 'Success',
                message: 'Data retrieved successfully',
                data: genre
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    deleteGenre: async (req, res) => {
        const { id } = req.params;
        try {
            await Category.destroy({ where: {id: id } });
            res.status(200).json({
                status: 'Success',
                message: `genre has been deleted`
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    getAllMovie: async (req, res) => {
        const { id } = req.params;

        try {
            const category = await Category.findOne({ 
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: MovieCategory,
                    attributes: ['categoryId'],
                    include: {
                        model: Movie,
                        attributes: ['title'],
                    }
                }
            });

            if (!category) {
                return res.status(400).json({
                    status: 'failed',
                    message: `No category found with id ${id}`
                });
            }

            res.status(200).json({
                status: 'Success',
                message: 'Success ',
                data: {
                    movie: category
                }
            })
        } catch (error) {
        console.log("🚀 ~ file: categoriesController.js ~ line 94 ~ getAllMovie: ~ error", error)
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}