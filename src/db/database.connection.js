import mongoose from "mongoose"


export const connectToDatabase = async () => {
    try {

        const {connection} = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
        console.log(`Database Connected Successfully at : ${connection.host}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}