
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const redisClient=require('../config/redis')


const userMiddleware=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        // console.log(token);
        
        if(!token){
            throw new Error("token is not present")
        }
        const paylaod=jwt.verify(token,process.env.JWT_KEY)
        const {_id}=paylaod
        if(!_id)
            throw new Error("invalid token")
        const result=await User.findById(_id)
        if(!result)
            throw new Error("user not exist")
        const IsBlocked=await redisClient.exists(`token:${token}`)

        if(IsBlocked)
            throw new Error("invalid token")
        req.result=result
        next()

    }
    catch(err){
        res.send(err.message)
    }
}

module.exports={userMiddleware}


