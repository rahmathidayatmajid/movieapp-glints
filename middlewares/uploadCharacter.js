const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: "charactermovie",
    api_key: "158377269216466",
    api_secret: "FP6X0Qior2ifuHUeXdqiNnwSIv0",
});
// ============================================================

// Upload Image ke cloudinary dgn folder Character

// ============================================================

module.exports = (namaKolum) => {
    try {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "Character",
                resources_type: "raw",
                public_id: (req, file) => {
                    return "image -" + new Date().getTime + path.extname(file.originalname)
                }

            }
        })

        const upload = multer({
            storage: storage,
        }).single(namaKolum)

        return (req, res, next) => {
            upload(req, res, (err) => {
                return next()
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        })

    }
}