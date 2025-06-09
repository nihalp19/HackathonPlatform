import express from "express"
import { protectRoute } from "../middleware/protectRoute"
import { adminRoute } from "../middleware/adminRoute"

const router = express.Router()

router.post("/", protectRoute, adminRoute, createHackthon)
router.get("/", getAllHackthons)
router.patch("/:id", protectRoute, adminRoute, updateHackthon)
router.get("/:id", fetchHackthon)
router.delete("/:id", protectRoute, adminRoute, deleteHackthon)


export default router