// Modules Imports 
import express, { urlencoded } from "express"
import dotenv  from "dotenv"
import cors    from "cors"
import cookieParser from "cookie-parser"



// Configured DotEnv 
dotenv.config()

// Server Init
const initServer = express()

// App Middlewars
app.use(cors({
    origin:process.env.ORIGIN_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use(urlencoded({extended:true}))
app.use(express.json({
    limit:'50mb'
}))

// Sockets 
const app = createServer(initServer);
const io = new Server(app, {
    cors:{
        origin:process.env.ORIGIN_URL,
        credentials:true
    }
});


io.on("connection", (socket) => {
  // ...
});


// Error Handler
app.use((err,req,res,next)=>{

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
