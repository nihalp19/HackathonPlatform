import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { addTeamMember } from "../controllers/team.controllers.js"

const router = express.Router()

router.post("/", protectRoute, createTeam)
router.patch("/:id/members", protectRoute, addTeamMember)
router.patch("/:id", protectRoute, updateTeam)
router.get("/:id/teams", protectRoute, getAllTeam)
router.get("/:id/team", protectRoute, getATeam)



export default router