// Modules Imports 
import app                   from './app.js'
import { connectToDatabase } from './db/database.connection.js'


connectToDatabase()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server Up : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`Error : ${error}`)
})