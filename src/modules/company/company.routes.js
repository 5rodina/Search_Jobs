import { Router } from "express"
import { addCompany, deleteCompany, getAllApplications, getCompanyData, searchCompany, updateCompany } from "./company.controller.js"
import { verifyToken } from "../../middleware/verifytoken.js"
import {companyVal } from './company.validate.js'
import { validate } from "../../middleware/validate.js"

const companyRouter= Router()

companyRouter.use(verifyToken)

companyRouter.get('/search',searchCompany)
companyRouter.get('/application/:id',getAllApplications)

companyRouter.post('/',validate(companyVal),addCompany)
companyRouter.route('/:id').put(updateCompany).delete(deleteCompany).get(getCompanyData)

export default companyRouter