import { json } from "stream/consumers";
import { io } from "../app.js";
import { Space } from "../models/space.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"



export default async function ListenToSocket(){


    /*
    Title   : Auth Middleware
    Working : Check if user is logged in ,
              logged in -> yes -> user = username
              logged in -> no  -> user = Guest 
    */
    io.use(async(socket,next)=>{

        try {

            const token = socket.handshake.auth.token 

    
            if(!token){
              socket.user = "Guest";
              return next()
            }
    
            const validatedUser = jwt.verify(token,process.env.JWT_SECRET)

                    
            if(!validatedUser){
                throw new ErrorResponse(400,"Unauthenticated")
            }
            
            const user = await User.findById(validatedUser._id)
            
            if(!user){
               throw new ErrorResponse(500,"Internal Server Error")
            }
            
            socket.user = user
            next()

        } catch (error) {
            console.log(error)   
        }
    })

    
    io.on("connection", async (socket) => {

        const {space} = socket.handshake.query
        const {role}  = socket.handshake.query


        // Get Space Detials associated with space data provided by user
        const spaceDetailsFetchedFromDatabase = await Space.findOne({
            name:space
        })


        /*
          Working : If user tries to access space which doesnt exist in database throw an error
        */
        if(!spaceDetailsFetchedFromDatabase){
            socket.emit("err","no-space-found")
        }
        else{
            socket.join(space)

            //Count Number of People
            const count = io.sockets.adapter.rooms.get(space).size

            socket.to(space).emit("user-joined",count)

        }

        /*
          Working : It Allows only person who created room to emit message to the room 
        */
        
        socket.on("chat",(msg)=>{
            const {content} = msg
            socket.to(space).emit("chat",parseContent(content))
        })
       

       //When Socket disconnects
        socket.on("disconnect", () => {
            const count = io.sockets?.adapter.rooms.get(space)?.size
            if(count){
                socket.to(space).emit("user-joined",count)
            }
            
        });


    })

}

export const parseContent = (content) => {
    const parsedContent = content.map((item) => {
        return {
            id: item.id,
            data: item.data,
        };
    });

    return parsedContent;
}

const logger = ({role,socketId}) =>{

    if(role == 'Space Master'){
      console.log(`Space Master Connected `,socketId)
    }
    else if(role == 'Joinee'){
      console.log(`Joinee Connected `,socketId)
    }
}