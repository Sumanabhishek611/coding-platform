const User=require("../models/user")
const bcrypt=require("bcrypt")
const validate=require("../utils/validator")
const jwt=require('jsonwebtoken')

const register=async(req,res)=>{
    try{
        validate(req.body);
        const {firstName,emailId,password} = req.body;
        req.body.password = await bcrypt.hash(password,10);
        const user= await User.create(req.body)
        const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60})
       res.cookie('token',token,{maxAge:60*60*1000})
       res.status(201).send("User registered successfully")
    }
    catch(err){
       res.status(400).send(err)
        
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
       const ans=bcrypt.hash(password,user.password)
       if(!ans){
        throw new Error("invalid credentials")
       }
       const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60})
       res.cookie('token',token,{maxAge:60*60*1000})
       res.status(200).send("user login successfully")
    }
    catch(err){
       res.status(401).send("Error: "+err);
    }
}