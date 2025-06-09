import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


export async function  connectDB () {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log("error while connecting url",error.message)
    }

}