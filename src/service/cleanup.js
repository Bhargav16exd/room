import { Space } from "../models/space.model.js"


export default async function cleanDB() {

    try {

        const spaces = await Space.find({selfDestruction:true})
        
        if(spaces.length == 0 ){
            return 
        }

        spaces.map((space)=>{
            
            const now = new Date()

            if( now > space.createdAt){
                console.log("ABHI banaya ")
            }else{
                console.log("PEHELE BANAYA")
            }

        })


    } catch (error) {
        console.log(error)
    }
    
}

