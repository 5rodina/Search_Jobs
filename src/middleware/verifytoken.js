import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    let{ token}=req.headers
    jwt.verify(token,process.env.SECRET_key,async(err,decoded)=>{
        if(err) return res.status(401).json({message:'invalid token',err})
        req.decodedToken = decoded
        next()
    })
}