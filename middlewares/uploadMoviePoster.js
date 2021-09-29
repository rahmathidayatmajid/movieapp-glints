const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: "dzp2ewohb",
    api_key: "363551511764247",
    api_secret: "aAHrxsg9IQQR8xw82Gz3EdITV4k",
});

// ============================================================

// Upload Image ke cloudinary dgn folder Poster Movie

// ============================================================

module.exports = (namaKolum) => {
    try {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "Poster Movie",
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