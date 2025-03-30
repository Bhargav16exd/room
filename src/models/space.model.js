import mongoose , {Schema} from "mongoose";

/*
  Title   : Defining Database Schema
  Working : It Defines how data will be stored into the database
*/
const spaceSchema = new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
})

export const Space = mongoose.model("Space",spaceSchema)