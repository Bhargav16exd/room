import {User} from "../models/user.model.js"
import ErrorResponse from "../utils/error.response.js"
import SuccessResponse from "../utils/success.response.js"



// Registering New User
export const registerUser = async (req,res,next) => {
  try {
    
    let {username}   = req.body
    const {password} = req.body

    if(!username || !password){
        throw new ErrorResponse(400,'Inputs missing')
    }

    username = username.toLowerCase()

    const existingUser = await User.findOne({username})

    if(existingUser){
        throw new ErrorResponse(400,'Username already exists')
    }

    const user = await User.create({
        username,
        password
    })

    if(!user){
        throw new ErrorResponse(500,'Error while creating user')
    }

    await user.save()

    return res.json(new SuccessResponse(201,"User Registration Sucess"))

  } catch (error) {
    next(error)    
  }
} 

// Login User and Send token
export const loginUser = async(req,res,next) => {
    try {

        let   {username}   = req.body
        const {password}   = req.body

        if(!username || !password){
            throw new ErrorResponse(400,'Inputs missing')
        }
    
        username = username.toLowerCase()

        const user = await User.findOne({username}).select("+password")

        if(!user){
            throw new ErrorResponse(500,'User Dont Exists')
        }

        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid){
            throw new ErrorResponse(400,'Invalid Password')
        }

        const token = await user.createAccessToken()

        const options = {
            httpOnly:true,
            secure:true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        return res
        .cookie("accessToken",token,options)
        .json(new SuccessResponse(201,'Login Success',{token:token}))
        
    } catch (error) {
        next(error)
    }
}

// Logout User
export const logout = async(req,res)=>{

    return res
    .status(200)
    .clearCookie("accessToken")
    .json(new SuccessResponse(200,"User logged out successfully")) 

}
