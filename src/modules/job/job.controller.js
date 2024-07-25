import { catchError } from "../../middleware/catchError.js";
import job from "../../../database/models/job.model.js"
import { appError } from '../../utils/appError.js'
import Company from "../../../database/models/company.model.js";
import Application from "../../../database/models/application.model.js"


export const addJob=catchError(async(req,res,next)=>{
    const { role: companyrole } = req.decodedToken 
    let result
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    result=await job.create(req.body)
    res.json({message:'job added successfully',result})
})

export const updateJob=catchError(async(req,res,next)=>{
    const { role: companyrole } = req.decodedToken 
    let result
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    result=await job.findByIdAndUpdate( req.params.id , req.body , { new:true })
    res.json({message:'job updated successfully',result})
})

export const deleteJob=catchError(async(req,res,next)=>{
    const { role: companyrole } = req.decodedToken 
    let result
    if(companyrole!=="Company_HR") return next(new appError('you arent authorize'))
    result=await job.findByIdAndDelete(req.params.id)
    res.json({message:'job deleted successfully',result})
})

export const getAllJobs=catchError(async(req,res,next)=>{
    const result=await job.aggregate([{$lookup: {
                from: 'companies',
                localField: 'addedBy',
                foreignField: 'companyHR',
                as: 'companyInfo'
            }
        },{
            $project: {
                '_id': 0,
                'companyInfo._id': 0,
            }
        }])
    res.json({message:'Success',result})
})

export const getCompanyjob = catchError(async(req,res,next)=>{
    const companyName = req.query.companyName;
       if(companyName) {
        const company = await Company.findOne({ companyName:companyName });

        if (company) {
          const result = await job.find({ addedBy: company.companyHR })
          res.json({ message: "success", result });
        } else {
            return next(new appError('company not found' ,401))
        }
    }
})

export const jobFilter=catchError(async(req,res,next)=>{
    const { workingTime, jobLocation, seniorityLevel, jobTitle } = req.query
    const filter = {
        ...(workingTime && { workingTime }),
        ...(jobLocation && { jobLocation }),
        ...(seniorityLevel && { seniorityLevel }),
        ...(jobTitle && { title: jobTitle })
    };

    const result = await job.find(filter)
    res.json({ message: "success", result });
})


export const applyToJob=catchError(async(req,res,next)=>{
    const { role: companyrole } = req.decodedToken 
    let result
    if(companyrole!=="User") return next(new appError('you arent authorize'))
    req.body.resume=req.file.filename
    await Application.create(req.body)
    res.json({message:'success'})
})



















