const User=require("../models/user")
const bcrypt=require("bcrypt")
const validate=require("../utils/validator")
const jwt=require('jsonwebtoken')
const redisClient=require('../config/redis')

const register=async(req,res)=>{
    try{
        validate(req.body);
        const {firstName,emailId,password} = req.body;
        req.body.password = await bcrypt.hash(password,10);
         req.body.role = 'user'
        const user= await User.create(req.body)
        const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60})
        const reply={
           firstName:user.firstName,
           emailId:user.emailId,
           _id:user._id
        }
       res.cookie('token',token,{maxAge:60*60*1000})
       res.status(201).json({
         user:reply,
         message:"user register successfully"
       })
    }
    catch(err){
       res.status(400).send(err.message)
        
    }

}

const login=async(req,res)=>{
    try{
       const {emailId,password}=req.body
       if(!emailId){
        throw new Error("invalid credentials")
       }
       if(!password){
        throw new Error("invalid credentials")
       }
       const user=await User.findOne({emailId})
       const ans=bcrypt.compare(password,user.password)
       if(!ans){
        throw new Error("invalid credentials")
       }
       const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60})
       res.cookie('token',token,{maxAge:60*60*1000})
       const reply={
         firstName:user.firstName,
         emailId:user.emailId,
         _id:user._id
       }
       res.status(200).json({
         user:reply,
         message:"User login successfully"
       })
    }
    catch(err){
       res.status(401).send("Error: "+err.message);
    }
}

const logout=async(req,res)=>{
   try{

      const {token}=req.cookies

      
      const payload=jwt.decode(token)
     
      
      
      await redisClient.set(`token:${token}`,"Blocked")
      await redisClient.expireAt(`token:${token}`,payload.exp)

      res.send("Logout successfully")

   }
   catch(err){
      res.status(503).send(err.message)
   }

}

const adminRegister=async(req,res)=>{
   try{

      validate(req.body)
      const {firstName,emailId,password}=req.body
      
      req.body.password=await bcrypt.hash(password,10)
       req.body.role='admin'
      const user=await User.create(req.body)
     
      const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:3600})
      res.cookie('token',token,{maxAge:60*60*1000})
      res.status(201).send("Admin registered successfully")
   }
   catch(err){
      res.status(400).send(err.message)
   }

}

const deleteProfile=async(req,res)=>{
   try{

      const userId=req.result._id;
      await User.findByIdAndDelete(userId)
      res.status(200).send("user deleted successfully")
   }
   catch(err){
      res.status(500).send(err.message)
   }

}

module.exports={register,login,logout,adminRegister,deleteProfile}