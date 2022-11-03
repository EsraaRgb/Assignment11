import { Router } from "express";
import { auth } from "../../Middlewares/auth.middleware.js";
import { validate } from "../../Middlewares/validation.middleware.js";
import * as schemas from './note.validation.js'
import {myMulter,multerValidation,HME} from '../../Services/Multer.js'
import * as controller from './controller/note.js'
const router = Router()

router.post('/', auth(), myMulter(multerValidation.image).single('image'), HME('/notes'),controller.addNote)
router.post('/update/:id', auth(),controller.updateNote)
export default router