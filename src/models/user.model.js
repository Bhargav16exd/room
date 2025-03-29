import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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
        select:false
    }
},{
    timestamps:true
})


// Hashing the Password Before Storing into the database
userSchema.pre('save', async (next) => {

    //If password is not Modified skip the procress
    if(!this.isModified('password')){
        next();
    } 

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


export const User = mongoose.model('User',userSchema)






