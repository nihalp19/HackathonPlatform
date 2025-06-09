import express from "express"
import { protectRoute } from "../middleware/protectRoute"
import { updateAvatar,updateProfile } from "../controllers/profile.controllers"

const router = express.Router()

router.patch("/update/:id", protectRoute,updateProfile)
router.patch("/:id",protectRoute,updateAvatar)

export default router

