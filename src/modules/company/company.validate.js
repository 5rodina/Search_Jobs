import Joi from 'joi';

export const companyVal=Joi.object({
    companyName:Joi.string().min(3).max(20).required(), 
    description:Joi.string().min(3).max(20).required(), 
    industry:Joi.string().min(3).max(20).required(), 
    address:Joi.string().min(3).max(20).required(), 
    numberOfEmployees: Joi.string().valid('1-11', '11-20', '21-50','51-100','101+').required(),
    companyEmail:Joi.string().email().required(),
    companyHR:Joi.string().required()
})