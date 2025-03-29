//Imports
import { User } from "../models/user.model.js"
import ErrorResponse from "../utils/error.response.js"
import jwt from "jsonwebtoken"



/*
  Title   : Authentication Middleware
  Working : function takes Authorization token from header , checks is it valid or not , 
            valid -> yes -> allows user to perform certain actions
            valid -> not -> restricts user and tell them they are unauthenticated
*/

export const authenticationMiddleware = async (req,res,next) => {
    try {

        const token = req.header('Authorization').split(" ")[1]

        if(!token){
            throw new ErrorResponse(401,"No Input Token Found")
        }

        const validatedUser = jwt.verify(token,process.env.JWT_SECRET)
        
        if(!validatedUser){
          throw new ErrorResponse(400,"Unauthenticated")
        }

        const user = await User.findById(validatedUser._id)

        if(!user){
            throw new ErrorResponse(500,"Internal Server Error")
        }

        req.user = user

        next()

    } catch (error) {
        console.log(error)
        next(error)
    }
}