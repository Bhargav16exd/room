import { Space } from "../models/space.model.js"
import {time} from "../contants.js"


export default async function cleanDB() {

    try {

        const spaces = await Space.find({selfDestruction:true})
        
        if(spaces.length == 0 ){
            return 
        }

        //Self Destruct
        spaces.map(async (space)=>{
            
            const now = new Date()

            if( time[space.selfDestructTime] < now - space.createdAt){
                await Space.findOneAndDelete({name:space.name})
            }

        })


    } catch (error) {
        console.log(error)
    }
    
}

