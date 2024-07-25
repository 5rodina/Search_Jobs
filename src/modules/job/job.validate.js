import Joi from 'joi';

export const jobVal=Joi.object({
    jobTitle:Joi.string().min(3).max(20).required(), 
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: Joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription:Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
    addedBy:Joi.string().required()
})