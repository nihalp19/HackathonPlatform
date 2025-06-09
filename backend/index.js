import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./utils/connectDB.js"
import session from "express-session"
import passport from "passport"
import authRoutes from "./routes/auth.routes.js"
import './utils/passport.js'

dotenv.config()

const PORT = process.env.PORT || 5000 

const app = express()



app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))


app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/",authRoutes)

app.all("/",(req,res) => {
    res.send("BACKEND IS RUNNING")
})


app.listen(PORT,() => {
    connectDB()
    console.log(`SERVER STARTED AT PORT NO ${PORT}`)
})
