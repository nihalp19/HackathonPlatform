import express from "express"
import { dashboard, googleCallBack ,googleAuth,logout} from "../controllers/auth.controllers.js"


const router = express.Router()


router.get("/auth/google",googleAuth)
router.get("/auth/google/callback",googleCallBack,dashboard)
router.get("/dashboard",dashboard)
router.get("/logout",logout)


export default router