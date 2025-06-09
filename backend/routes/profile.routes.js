import express from "express"
import { protectRoute } from "../middleware/protectRoute"
import { updateAvatar, updateProfile } from "../controllers/profile.controllers"

const router = express.Router()

router.patch("/:id/profile", protectRoute, updateProfile)
router.patch("/:id/avatar", protectRoute, updateAvatar)

export default router

