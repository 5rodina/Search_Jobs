
import jwt from 'jsonwebtoken'
import User from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import { catchError } from '../../middleware/catchError.js'
import { appError } from '../../utils/appError.js'
import { sendEmails } from '../../email/email.js'


export const signup=catchError( async (req,res,next)=>{
    const { firstName, lastName, email, password, recoveryEmail, DOB, mobileNumber, role } = req.body
    const user=await User.findOne({email})
    if(user) return next(new appError('email already exists' ,401)) 
    const hashed=await bcrypt.hash(password,5)
    sendEmails(email) 
    const result= await User.create({firstName,lastName,email,password:hashed,recoveryEmail,DOB:new Date(DOB) ,
     mobileNumber,role})
    res.json({message:'signed up successfully',result})
})


export const signin=catchError(async(req,res,next)=>{
    const {identifier,password}=req.body

    const user = await User.findOne({$or: [{ email: identifier },{ recoveryEmail: identifier },{ mobileNumber: identifier }]})
    if(!user.confirmEmail) return next(new appError('email isnt confirmed yet' ,401))
    if (!user) {
        return next(new appError('Invalid email or password' ,401))
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new appError('Invalid email or password' ,401))
    }
    await User.updateOne({ _id: user._id },{$set:{status:'online'}})
    jwt.sign({id:user._id,name:user.username,role:user.role},
        process.env.SECRET_key,(err,token)=>{
            res.status(200).json({ message: 'Signed in successfully', token});
        }
    )
})

export const updateAccount=catchError(async(req,res,next)=>{
    const { id: userId } = req.decodedToken 
    const { firstName, lastName, email, recoveryEmail, DOB, mobileNumber}=req.body
    let user = await User.findById(req.params.id)
    if(userId!==req.params.id) return next(new appError('you arent the owner'))
    if(user.status!=="online") return next(new appError('you arent loggedin'))
    user=await User.findOne({$or: [{email },{recoveryEmail}]})
    if(user) return next(new appError('already existed'))
    const updated= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
     res.json({message:'Updated Successfully',updated})
    })  

export const deleteAccount=catchError(async(req,res,next)=>{
    const { id: userId } = req.decodedToken 
    let user = await User.findById(req.params.id)
    if(userId!==req.params.id) return next(new appError('you arent the owner'))
    if(user.status!=="online") return next(new appError('you arent loggedin'))
    user=await User.findByIdAndDelete(req.params.id)
    res.json({message:'Deleted Successfully',user})
})

export const getUserAccount=catchError(async(req,res,next)=>{
    const { id: userId } = req.decodedToken 
    let user = await User.findById(req.params.id)
    if(userId!==req.params.id) return next(new appError('you arent the owner'))
    if(user.status!=="online") return next(new appError('you arent loggedin'))
    user=await User.findById(req.params.id)
    res.json({message:'Success',user})
})

export const getProfile=catchError(async(req,res,next)=>{
    const user=await User.findById(req.params.id).select('-_id username email recoveryEmail DOB mobileNumber')
    if(!user)return next(new appError('user not found'))
    res.json({message:'Success',user})
})

export const updatePassword=catchError(async(req,res,next)=>{
    const{password, updatePassword}=req.body 
    const result= await User.findById(req.params.id)
    if(!result)return next(new appError('user not found'))   
    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    if(!isPasswordCorrect)return next(new appError('password is wrong'))
    const hashed=await bcrypt.hash(updatePassword,5)
    const resultt=await User.findByIdAndUpdate(req.params.id,{password:hashed},{new:true})
    res.json({message:'Success',resultt})
})

export const getAllAccounts=catchError(async(req,res,next)=>{
    const{recoveryEmail}=req.body 
    const result=await User.find({$or: [{recoveryEmail}]}).select('-_id email')
    if(!result)return next(new appError('user not found'))
        res.json({message:'Success',result})

})

export const forgetPassword=catchError(async(req,res,next)=>{
    let otpStart= Date.now()
    const {email}=req.body
    const result=await User.findOne({email})
    if(!result)return next(new appError('user not found'))
    let otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    sendEmails(email,otpCode)
    const resultt= await User.findOneAndUpdate({email},{otpCode:otpCode,otpExpired:otpStart},{new:true})
    res.json({message:"code is sent",resultt})
})

export const resetPassword=catchError(async(req,res,next)=>{
    const{email,code,newPassword}=req.body
    let otpEnd=Date.now()
    let resultt
    const result=await User.findOne({email})
    if(result.otpCode!==code)return next(new appError('wrong code'))
    const time =result.otpExpired-otpEnd
    if(time<10){
      const hashed=await bcrypt.hash(newPassword,5)
      resultt=await User.findOneAndUpdate({email},{password:hashed})
      res.json({message:'success'})
    }else{
        return next(new appError('code is expired'))
    }
})

