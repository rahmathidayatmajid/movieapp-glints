const { Character } = require('../models')

module.exports = {
    postActor : async (req, res) => {
        const name = req.body.name;
        const file = req.file;

        try {
            const check = await Character.findOne({ where: { name } });
            
            if (check) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to character'
                });
            }

            const actor = await Character.create({
                name,
                //profilePict: file.path
            });

            if(!actor) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Cannot insert data actor'
                })
            }

            return res.status(200).json({
                status: 'Success',
                message: 'Successfully insert data actor'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    getActor: async (req, res) => {
        try {
            const actor = await Character.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            if(!actor) {
                return res.status(400).json({
                    status: "failed",
                    massage: "Data not found"
                });
            }
            res.status(200).json({
                status: 'Success',
                message: 'Data retrieved successfully',
                data: actor
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    },

    deleteActor: async (req, res) => {
        const { id } = req.params;
        try {
            await Character.destroy({ where: {id: id } });
            res.status(200).json({
                status: 'Success',
                message: "Actor has been deleted"
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'failed',
                message: 'Internal server error'
            })
        }
    }
}