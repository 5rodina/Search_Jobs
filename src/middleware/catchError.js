export function catchError(callbak){
    return(req,res,next)=>{
        callbak(req,res,next).catch(err=>{
            next(err)
        })
    }
}