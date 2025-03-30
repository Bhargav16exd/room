import {Router} from "express"

// Router Functions Handling 
import { loginUser, logout, registerUser } from "../controllers/user.controller.js"
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"

const router = Router()


/*
  Title   : Auth Routes
  Working : anything that comes on someroute ('/...') will be handled by the function in front of it , imported from controllers 
*/
router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)

// Authenticated Routes
router.route('/logout').post(authenticationMiddleware,logout)


// Exports
export default router