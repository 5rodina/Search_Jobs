
import mongoose from "mongoose"

const applicationSchema=new mongoose.Schema({
    jobId:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    userTechSkills: {
        type: [String],
        required: true,
    },
    userSoftSkills: {
        type: [String],
        required: true,
    },
    resume:{
        type: String,
        required: true,  
    }
})

const Application=mongoose.model('Application',applicationSchema)

export default Application