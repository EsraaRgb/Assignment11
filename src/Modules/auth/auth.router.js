import { Router } from "express";
import { validate } from "../../Middlewares/validation.middleware.js";
import * as schemas from "./auth.validation.js";
import * as controller from "./controller/auth.js";
const router = Router();

router.post('/signup', validate(schemas.signUp, "/signup"),controller.signUp)
router.post('/login', validate(schemas.signIn, "/login"),controller.signIn)

export default router;
