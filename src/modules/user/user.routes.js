import { Router } from "express"
import { verifyToken } from "../../middleware/verifytoken.js"
import { deleteAccount, forgetPassword, getAllAccounts, getProfile, getUserAccount, resetPassword, signin, signup, updateAccount, updatePassword} from "./user.controller.js"
import { userVal } from "./user.validate.js"
import { validate } from "../../middleware/validate.js"

const userRouter= Router()



userRouter.post('/signup',validate(userVal),signup)
userRouter.post('/signin',signin)

userRouter.use(verifyToken)

userRouter.get('/forget',forgetPassword)
userRouter.post('/reset',resetPassword)


userRouter.get('/',getAllAccounts)


userRouter.route('/:id').get(getProfile).get(getUserAccount)
.put(updatePassword).put(updateAccount).delete(deleteAccount)



export default userRouter