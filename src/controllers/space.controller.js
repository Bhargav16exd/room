// Imports
import ErrorResponse from "../utils/error.response.js"
import { Space } from "../models/space.model.js"
import SuccessResponse from "../utils/success.response.js"
import { User } from "../models/user.model.js"
import { spaceData } from "../socket/socketHandling.js"



/*
    Title   : Space Controller
    Working : Creates an Entry into the database of a room created
*/
export const createSpace = async (req,res,next) =>{
    try {

        const {name,selfDestructTime} = req.body

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
            createdBy:req.user._id,
            selfDestructTime
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
    Working : Fetches all the recent spaces created by the user
*/


export const getRecent = async (req,res,next) =>{
    try {

        const spaces = await Space.find({
            createdBy:req.user._id,
            selfDestruction:true
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

/*
    Title   : Space Controller
    Working : Fetches all the archive spaces created by the user
*/


export const getArchive = async (req,res,next) =>{
    try {

        const spaces = await Space.find({
            createdBy:req.user._id,
            selfDestruction:false
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



/*
    Title   : Space Controller
    Working : Check if a space exist
*/

export const spaceExists = async(req,res,next) => {

    try {

        const {spacename,username} = req.params
        
        if(!spacename || !username){
            throw new ErrorResponse(400,'Invalid Inputs')
        }

        const space = await Space.findOne({
            name:`${username}/${spacename}`,
        })

        if(!space){
            return res.json({"exist":false})
        }
        
        return res.json({"exist":true})
        
    } catch (error) {
        next(error)
    }

}


/*
    Title   : Space Controller
    Working : Archive Space : Turns Self Destruction to false
*/

export const archive = async(req,res,next) => {

    try {

        const {spacename} = req.body
        const {username} = req.user
        
        if(!spacename){
            throw new ErrorResponse(400,'Invalid Inputs')
        }

        const localSpaceData = spaceData[`${username}/${spacename}`]

        if(!localSpaceData.content){
            throw new ErrorResponse(400,'Empty Space Data Cannot be saved')
        }

        const {content} = localSpaceData

        const space = await Space.findOneAndUpdate({
            name:`${username}/${spacename}`,
        },{
            selfDestruction:false,
            content
        })

        if(!space){
            throw new ErrorResponse(400,'No Such Space Exists')
        }
        
        return res.json(new SuccessResponse(200,"Archived Successfully"))
        
    } catch (error) {
        next(error)
    }

}

/*
    Title   : Space Controller
    Working : Delete Space
*/


export const deleteSpace = async(req,res,next) => {

    try {

        const {spacename,username} = req.params
        
        if(!spacename || !username){
            throw new ErrorResponse(400,'Invalid Inputs')
        }

        await Space.findOneAndDelete({
            name:`${username}/${spacename}`,
        })

        return res.json(new SuccessResponse(200,"Space Deleted Successfully"))
        
    } catch (error) {
        next(error)
    }

}