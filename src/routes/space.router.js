import {Router} from "express"

// Router Functions Handling 
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { createSpace } from "../controllers/space.controller.js"


const router = Router()


/*
  Title   : Space Routes
  Working : anything that comes on someroute ('/...') will be handled by the function in front of it , imported from controllers 
*/
router.route('/createSpace').post(authenticationMiddleware,createSpace)



//Exports
export default router