import mongoose , {Schema} from "mongoose";
import { type } from "os";

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
    },
    content:[],
    selfDestruction:{
        type:Boolean,
        default:true,
    },
    selfDestructTime:{
        type:String,
        enum:['1hr','6hr','12hr','24hr']
    }
},
{
    timestamps:true
})

export const Space = mongoose.model("Space",spaceSchema)