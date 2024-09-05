import { Router } from "express"
import passport from 'passport'
import { sessionController } from "../controllers/session.controller.js"
import { userDto } from "../dto/session.dto.js"
import { validate } from "../middlewares/validation.middleware.js"

const router = Router()

router.post('/register', validate(userDto), passport.authenticate('register',{failureRedirect:'/failregister'}), sessionController.register)
router.post('/login', passport.authenticate('login',{failureRedirect:'/login-error'}), sessionController.login)
router.get("/login-error",  sessionController.loginError);
router.get("/logout", sessionController.logout);
router.get('/current', passport.authenticate('current', {session: false}), sessionController.current)

export default router 
