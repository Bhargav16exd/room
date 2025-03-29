import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt    from "jsonwebtoken"

/*
  Title   : Defining Database Schema
  Working : It Defines how data will be stored into the database
*/
const userSchema = new Schema({

    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select: false
    }
},{
    timestamps:true
})


// Hashing the Password Before Storing into the database
userSchema.pre('save', async function(next){

    //If password is not Modified skip the procress
    if(!this.isModified('password')){
        next();
    } 

    this.password = await bcrypt.hash(this.password,10)
})

// Comparing Entered Password with Password in the database
userSchema.methods.comparePassword = async function (userInputPassword){
  try {
    return await bcrypt.compare(userInputPassword,this.password)
  } catch (error) {
    console.log(`Error Comparing Password : ${error}`)
  }
}

// Generating Access Token 
userSchema.methods.createAccessToken = async function (){
  try {

    // Generate as Token
    const token = jwt.sign({
        _id : this._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'2d'
    })

    return token
    
  } catch (error) {
    console.log(`Error creating access token : ${error}`)
  }
}

export const User = mongoose.model('User',userSchema)






