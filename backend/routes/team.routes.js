import express from "express"
import {protectRoute} from "../middleware/protectRoute.js"
import { addTeamMember } from "../controllers/team.controllers.js"

const router = express.Router()

router.post("/createTeam",protectRoute,createTeam)
router.patch("/add/:id",protectRoute,addTeamMember)
router.patch("/update/:id",protectRoute,updateTeam)
router.get("/all/:id",protectRoute,getAllTeam)
router.get("/:id",protectRoute,getATeam)



export default router