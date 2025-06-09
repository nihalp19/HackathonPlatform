import User from "../models/user.model";
import { cloudinaryInstance } from "../utils/cloudinary";

export const updateProfile = async(req,res) => {

    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({success : false,message : "id is required"})
        }

        const {collegeName,  graduationYear} = req.body 

        if(!collegeName || !graduationYear) {
            return res.status(400).json({success : false,message : "Flied is missing"})
        }

        const user = await User.findOne({_id : id})
        if(!user){
            return res.status(400).json({success : false,message : "user not found"})
        }

        user.collegeName = collegeName
        user.graduationYear = graduationYear

        await user.save()
        return res.status(200).json({success : true,message : "Upated successfully"})
    } catch (error) {
        console.log("error while logging",error.message)
        return res.status(500).json({success : false,message : "Internal Server Error",error : error.message})
    }
}



export const updateAvatar = async(req,res) => {

    try {
        const {id} = req.params 
        const {avatar} = req.body

        if(!id){
            return res.status(400).json({success : false,message : "id is required"})
        }

        if(!avatar){
            return res.status(400).json({success : false,messsage : "avatar not found"})
        }

        const user = await User.findOne({_id : id})
        if(!user){
            return res.status(400).json({success : false,message : "user not found"})
        }

        const result = cloudinaryInstance.uploader.upload(avatar)

        const uploadedAvatarUrl = result.secure_url

        user.avatar = uploadedAvatarUrl
        await user.save()
    
        return res.status(200).json({success : true,messsage : "avatar uploaded successfull"})
    } catch (error) {
        console.log("error while updating avatar",error.message)
        return res.status(500).json({success : false,message : ""})
    }
}

