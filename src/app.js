// Modules Imports 
import express, { urlencoded } from "express"
import dotenv  from "dotenv"
import cors    from "cors"
import cookieParser from "cookie-parser"



// Configured DotEnv 
dotenv.config()

// Server Init
const app = express()

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





export default app

