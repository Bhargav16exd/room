// Modules Imports 
import express, { urlencoded } from "express"
import dotenv  from "dotenv"
import cors    from "cors"
import cookieParser     from "cookie-parser"
import { createServer } from "http";
import {Server} from "socket.io"


// Routes Import
import userRouter from "./routes/user.router.js"
import spaceRouter from "./routes/space.router.js"
import ListenToSocket from "./socket/socketHandling.js";
import cleanDB from "./service/cleanup.js";

// Configured DotEnv 
dotenv.config()

// Server Init
const initServer = express()


// Sockets 
const app = createServer(initServer);
const io = new Server(app, {
    cors:{
        origin:process.env.ORIGIN_URL,
        credentials:true
    }
});

// App Middlewares
initServer.use(cors({
    origin:process.env.ORIGIN_URL,
    credentials:true
}))
initServer.use(cookieParser())
initServer.use(express.json())
initServer.use(express.static('public'))
initServer.use(urlencoded({extended:true}))
initServer.use(express.json({
    limit:'50mb'
}))

// Routing
initServer.use('/api/v1/user',userRouter)
initServer.use('/api/v1/space',spaceRouter)


//Listen to Socket
ListenToSocket();


/*
    Working : After every 1 hr this function is executed and deletes all expired spaces
*/
setInterval(async()=>{
    await cleanDB()
},1000 * 60 * 60)

// Error Handler
initServer.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message ;
    const errors = err.errors || [];

    res.status(statusCode).json({
        success:false,
        message,
        errors ,
        data:null
    })

})


export default app
export {
    io
}
