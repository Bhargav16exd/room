// Modules Imports 
import express, { urlencoded } from "express"
import dotenv  from "dotenv"
import cors    from "cors"
import cookieParser     from "cookie-parser"
import { createServer } from "http";
import {Server} from "socket.io"


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

io.on("connection", (socket) => {
  // ...
});


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
