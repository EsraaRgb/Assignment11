import { Router } from "express";
import { auth } from "../../Middlewares/auth.middleware.js";
import {myMulter,HME,multerValidation } from '../../Services/Multer.js'
import * as controller from './controller/user.js'
const router = Router()
router.post('/profile/pic',auth(),myMulter(multerValidation.image).single('image'),HME('/user/profile'),controller.addPic)
router.get('/delete/:id',auth(),controller.deleteUser)
router.post('/update/:id',auth(),controller.updateUser)


export default router