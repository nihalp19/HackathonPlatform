import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    Hacthontype : {
        type : String,
        enum : ["online","offline"],
        required : true
    },
    name: {
        type: String,
        required : true,
    },
    place: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required : true,
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' // or 'Team
    }],
    pricepool: {
        type: String
    },
    organizaredBy: {
        type: String
    },
    HackthonDate : {
        type : Date
    }
}, { timestamps: true })


const HACK = mongoose.model('HACK', hackathonSchema)

export default HACK