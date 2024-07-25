import { ObjectId } from "bson";
import mongoose from "mongoose"

const jobSchema= new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true,
    },
    jobLocation:{
        type:String,
        required:true,
        enum:['onsite','remotely','hybrid']
    },
    workingTime:{
        type:String,
        required:true,
        enum:['part-time','full-time']
    },
    seniorityLevel:{
        type:String,
        required:true,
        enum:['Junior','Mid-Level','Senior','Team-Lead','CTO']
    },
    jobDescription:{
        type:String,
        required:true
    },
    technicalSkills: {
        type: [String],
        required: true,
    },
    softSkills: {
        type: [String],
        required: true,
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
        required: true
    }, 

})

const Job= mongoose.model('Job',jobSchema)

export default Job