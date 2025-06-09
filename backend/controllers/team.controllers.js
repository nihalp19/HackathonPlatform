import Team from "../models/team.module";
import HACK from "../models/hackathon.model";

export const createTeam = async (req, res) => {

    try {
        const { hackthonid, teamname, teamsize, members, leaderId } = req.body

        if (!hackthonid) {
            return res.status(400).json({ success: false, message: "hacthoid is required" })
        }

        if (!teamname) {
            return res.status(400).json({ success: false, message: "teamname is required" })
        }

        if (!teamsize) {
            return res.status(400).json({ success: false, message: "teamsize is required" })
        }

        if (!members) {
            return res.status(400).json({ success: false, message: "members is required" })
        }

        if (leaderId) {
            return res.status(400).json({ success: false, message: "leaderId is required" })
        }

        const team = await Team.create({
            hackthonid,
            teamname,
            teamsize,
            members,
            leaderId
        })

        return res.status(200).json({ success: false, message: "Team is created successfully", team: team })

    } catch (error) {
        console.log("error while creating team", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const updateTeam = async (req, res) => {
    try {
        const { id } = req.params

        const { teamname, teamsize, leaderId } = req.body

        if (!id) {
            return res.status(400).json({ success: false, message: "id is required" })
        }

        const userId = req.user.id

        const team = await Team.findByIdAndUpdate(id, {
            $set: {
                teamname, teamsize, members: { userId }, leaderId
            }
        }, { new: true, runValidators: true })

        return res.status(200).json({ success: true, message: "team is created" })
    } catch (error) {
        console.log("error while updating team", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}




export const addTeamMember = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ success: false, message: "id is required" })
        }

        const teamExits = await Team.findOne({ _id: id })

        if (!teamExits) {
            return res.status(400).json({ success: false, message: "team not found" })
        }

        const memberId = req.user.id

        const members = teamExits.members
        members.append({ memberId })

        teamExits.members = members
        await teamExits.save()
        return res.status(200).json({ success: true, message: "team member added" })
    } catch (error) {
        console.log("error while adding member", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}


export const getAllTeam = async (req, res) => {

    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ success: false, message: "id is required" })
        }

        const Hackthon = await HACK.findById(id).populate('team'); // Assuming "team" is a ref to another model
        if (!Hackthon) {
            return res.status(404).json({ success: false, message: "Hackathon not found" });
        }

        return res.status(200).json({ success: true, message: "get all teams member", teams: Hackthon.team })

    } catch (error) {
        console.log("error while getting all team", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const getATeam = async (req, res) => {

    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ success: false, message: "id is required" })
        }

        const team = await Team.findOne({ _id: id })

        if (!team) {
            return res.status(400).json({ success: false, message: "team not found" })
        }

        return res.status(200).json({ success: false, message: "team found successfully" })

    } catch (error) {
        console.log("error while fetching the team", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}

