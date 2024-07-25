import Joi from 'joi';

export const userVal=Joi.object({
    firstName:Joi.string().min(3).max(20).required(), 
    lastName: Joi.string().min(3).max(20).required(),
    username: Joi.string().optional(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Za-z0-9]{3,20}$/).required(),
    recoveryEmail: Joi.string().email().required(),
    DOB:Joi.date().required(),
    mobileNumber:Joi.string().required(),
    role: Joi.string().valid('User', 'Company_HR').required(),
    status: Joi.string().valid('online', 'offline').optional(),
    confirmEmail:Joi.boolean().optional()
})