import mongoose from "mongoose"

const companySchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }, 
    industry:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }, 
    numberOfEmployees: {
        type: String,
        enum: ['1-10', '11-20', '21-50', '51-100', '101+'],
        required: true,
    }, 
    companyEmail:{
        type:String,
        required:true,
        unique:true
    }, 
    companyHR:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
})

const Company=mongoose.model('Company',companySchema)

export default Company