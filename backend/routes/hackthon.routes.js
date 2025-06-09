import express from "express"
import { protectRoute } from "../middleware/protectRoute"
import { adminRoute } from "../middleware/adminRoute"

const router = express.Router()

router.post("/create",protectRoute,adminRoute,createHackthon)
router.get("/",getAllHackthons)
router.patch("/update/:id",protectRoute,adminRoute,updateHackthon)
router.get("/fetch/:id",fetchHackthon)
router.delete("/delete/:id",protectRoute,adminRoute,deleteHackthon)


export default router