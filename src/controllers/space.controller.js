// Imports
import ErrorResponse from "../utils/error.response.js"
import { Space } from "../models/space.model.js"
import SuccessResponse from "../utils/success.response.js"



/*
    Title   : Space Controller
    Working : Creates an Entry into the database of a room created
*/
export const createSpace = async (req,res,next) =>{
    try {

        const {name} = req.body

        if(!name){
            throw new ErrorResponse(400,"Incomplete Inputs")
        }

        const ifSpaceExistWithSameName = await Space.findOne({
            name:`${req.user.username}/${name}`,
            createdBy:req.user._id
        })

        if(ifSpaceExistWithSameName){
            throw new ErrorResponse(400,"Room Exists with Same Name")
        }
        
        const space = await Space.create({
            name:`${req.user.username}/${name}`,
            createdBy:req.user._id
        })

        if(!space){
            throw new ErrorResponse(500,"Internal Server Error")
        }

        await space.save()

        return res.json(
            new SuccessResponse(201,"Space Creation Success",space)
        )

        
    } catch (error) {
        next(error)
    }
}


/*
    Title   : Space Controller
    Working : Fetches all the spaces created by the user
*/

export const getAllSpaces = async (req,res,next) =>{
    try {

        const spaces = await Space.find({
            createdBy:req.user._id
        })

        if(!spaces || spaces.length === 0){
            throw new ErrorResponse(404,"No Spaces Found")
        }

        return res.json(
            new SuccessResponse(200,"Spaces Fetched Successfully",spaces)
        )

        
    } catch (error) {
        next(error)
    }
}