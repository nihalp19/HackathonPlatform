import HACK from "../models/hackathon.model";
import { cloudinaryInstance } from "../utils/cloudinary";

export const createHackthon = async (req, res) => {

    try {
        const { image, name, Hacthontype, place, description, team, pricepool, organizaredBy } = req.body

        if (!image) {
            return res.status(400).json({ success: false, message: "image is required" })
        }
        if (!name) {
            return res.status(400).json({ success: false, message: "name is required" })
        }
        if (!Hacthontype) {
            return res.status(400).json({ success: false, message: "Hacthontype is required" })
        }
        if (!place) {
            return res.status(400).json({ success: false, message: "place is required" })
        }
        if (!description) {
            return res.status(400).json({ success: false, message: "description is required" })
        }
        if (!team) {
            return res.status(400).json({ success: false, message: "team is required" })
        }
        if (!pricepool) {
            return res.status(400).json({ success: false, message: "pricepool is required" })
        }
        if (!organizaredBy) {
            return res.status(400).json({ success: false, message: "organizaredBy is required" })
        }

        const imageUrl = ''

        if (image) {
            const result = cloudinaryInstance.uploader.upload(image)
            imageUrl = result.secure_url
        }

        const hackathon = await HACK.create({
            image: imageUrl,
            name,
            Hacthontype,
            place,
            description,
            team,
            pricepool,
            organizaredBy
        })

        return res.status(200).json({ success: true, message: "create a hackathon", hackathon: hackathon })

    } catch (error) {
        console.log("error while createing hackthon", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const getAllHackthons = async (req, res) => {
    try {
        const allHackthons = await HACK.find({})

        return res.status(200).json({ success: true, message: "All Hackthons fetched", hackathon: allHackthons })
    } catch (error) {
        console.log("error while fetching all hackthons", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}


export const updateHackthon = async (req, res) => {

    try {
        const { id } = req.params
        const { image, Hacthontype, name, place, description, team, pricepool, organizaredBy, HackthonDate } = req.body

        if (!id) {
            return res.status(400).json({ success: false, message: "id is required" })
        }

        if (!hackthon) {
            return res.status(400).json({ success: false, message: "not found" })
        }

        const hackthon = await HACK.findByIdAndUpdate(id, {
            $set: {
                image,
                Hacthontype,
                name,
                place,
                description,
                team,
                pricepool,
                organizaredBy,
                HackthonDate
            }
        },
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            success: true,
            message: "Hackathon updated successfully",
            data: hackthon
        });

    } catch (error) {
        console.log("error while updating hackthon", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}


export const fetchHackthon  = async(req,res) => {

    try {
        const {id} = req.params 

        if(!id){
            return res.status(400).json({success : false,message : "id is required"})
        }

        const hackathon = await HACK.findOne({_id : id})

        if(!hackathon){
            return res.status(400).json({success : false,message : "hackathon not found"})
        }

        return res.status(200).json({success : false,message : "hackathon found",hackathon : hackathon})
    } catch (error) {
        console.log("error while fetching data",error.message)
        return res.status(500)
    }

}

export const deleteHackthon = async(req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({success : false,message : "id is required"})
        }
        await HACK.findByIdAndDelete(id)
        return res.status(500).json({success : false,message : "deleted hackthon successfully"})
    } catch (error) {
        console.log("error while deleting hackthon",error.message)
        return res.status(500).json({success : false,message : "Internal Server Error",error : error.message})
    }
}


