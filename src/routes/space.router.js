import {Router} from "express"

// Router Functions Handling 
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { createSpace, getAllSpaces, spaceExists } from "../controllers/space.controller.js"


const router = Router()


/*
  Title   : Space Routes
  Working : anything that comes on someroute ('/...') will be handled by the function in front of it , imported from controllers 
*/
router.route('/createSpace').post(authenticationMiddleware,createSpace)
router.route('/getAllSpaces').get(authenticationMiddleware,getAllSpaces)

router.route('/exists/:username/:spacename').get(spaceExists)


//Exports
export default router