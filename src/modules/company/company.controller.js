import { catchError } from "../../middleware/catchError.js";
import Company from "../../../database/models/company.model.js"
import { appError } from '../../utils/appError.js'
import Job from "../../../database/models/job.model.js";
import  Application from "../../../database/models/application.model.js"

export const addCompany = catchError( async(req,res,next)=>{
    const { role: companyrole } = req.decodedToken 
    let result
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    result=await Company.create(req.body)
    res.json({message:'company added successfully',result})
})

export const updateCompany = catchError( async(req,res,next)=>{
    const { role: companyrole,id:userId } = req.decodedToken
    const company=await Company.findById(req.params.id)
    if(userId!==company.companyHR.toString()) return next(new appError('you arent the owner')) 
    let result
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    result=await Company.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json({message:'company data updated successfully',result})
})

export const deleteCompany = catchError( async(req,res,next)=>{
    const { role: companyrole,id:userId } = req.decodedToken
    const company=await Company.findById(req.params.id)
    if(userId!==company.companyHR.toString()) return next(new appError('you arent the owner')) 
    let result
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    result=await Company.findByIdAndDelete(req.params.id,req.body,{new:true})
    res.json({message:'company data deleted successfully',result})
})

export const getCompanyData = catchError( async(req,res,next)=>{
    const { role: companyrole } = req.decodedToken
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    const result= await Company.findById(req.params.id)
    const resultt= await Job.find({addedBy: result.companyHR})   
    res.json({message:'the jobs of this company',resultt})
})

export const searchCompany = catchError( async(req,res,next)=>{
    const company=await Company.findOne({companyName:req.query.name})
    if(!company) return next(new appError('sorry,this company isnt here'))
    res.json({message:'Success',company})
})

export const getAllApplications= catchError(async(req,res,next)=>{
    const { role: companyrole , id:hrId} = req.decodedToken
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    const result= await Job.findById(req.params.id)
    if(result.addedBy.toString()!==hrId) return next(new appError('sorry ,you dont have access on this job'))
    const resultt=await Application.find({jobId:req.params.id})
    res.json({message:"success",resultt})
})