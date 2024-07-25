import { Router } from "express"
import { verifyToken } from "../../middleware/verifytoken.js"
import { addJob, applyToJob, deleteJob, getAllJobs, getCompanyjob,  jobFilter,  updateJob } from "./job.controller.js"
import upload from "../../utils/upload.js"
import {jobVal} from './job.validate.js'
import { validate } from "../../middleware/validate.js"

const jobRouter= Router()

jobRouter.use(verifyToken)

jobRouter.post('/',validate(jobVal),addJob)
jobRouter.get('/',getAllJobs)


jobRouter.get('/company', getCompanyjob)
jobRouter.get('/filter', jobFilter)

jobRouter.route('/photo').post(upload.single('resume'),applyToJob)

jobRouter.route('/:id').put(updateJob).delete(deleteJob)

export default jobRouter