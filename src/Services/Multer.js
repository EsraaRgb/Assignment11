
import multer from 'multer'


export const HME = (redirectPath) => {
    return (err, req, res, next) => {
        if (err) {
            req.flash('multerErr', err)
            res.redirect(redirectPath)
        } else {
            next()
        }

    }
}


export const multerValidation = {
    image: ['image/png', 'image/jpeg', 'image/jif']
}
export function myMulter(customValidation = multerValidation.image) {


    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (!customValidation.includes(file.mimetype)) {
            cb("In-valid Format", false)
        } else {
            cb(null, true)

        }
    }
    const upload = multer({ fileFilter, storage: storage })
    return upload
}