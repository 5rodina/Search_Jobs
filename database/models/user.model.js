
import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username: {
        type: String,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }, 
    recoveryEmail:{
        type:String,
        required:true,
    },
    DOB:{
        type:Date,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:['User','Company_HR']
    },
    status:{
        type:String,
        enum:['online','offline'],
        default: 'offline',
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    otpCode:String,
    otpExpired:Date
})

userSchema.pre('save', function(next) {
    this.username = `${this.firstName}${this.lastName}`.toLowerCase()
    next()
})

const User= mongoose.model('User',userSchema)

export default User