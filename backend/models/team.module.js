import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    hackthonid: {
        type: String,
        required: true
    },
    teamname: {
        type: String,
    },
    teamsize: {
        type: Number,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    leaderId : {
        type : String
    }
},{timestamps : true})

const Team = mongoose.model('Team',TeamSchema)

export default Team