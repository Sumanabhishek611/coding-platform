
const express =require('express')
const path=require('path')
const app=express()
require('dotenv').config({path:path.join(__dirname,'../.env')})
const main=require('./config/db')

const cookieParser=require('cookie-parser')
const authRouter=require('./routes/userAuth')
const redisClient=require('./config/redis')
const problemRouter = require('./routes/problemCreator');
const submitRouter = require('./routes/submit');
const submitCodeRateLimiter=require('./middleware/ratelimiter')
app.use(express.json())
app.use(cookieParser())
// app.use(submitCodeRateLimiter)
app.use('/user',authRouter)
app.use('/problem',problemRouter)
app.use('/submission',submitRouter)
const InitalizeConnection=async()=>{
   
    try{
        Promise.all([main(),redisClient.connect()])
        console.log("Db and redis connected");
        app.listen(process.env.PORT,()=>{
            console.log("server is listening at port 3000");
            
        })
    }
    catch(err){
       console.log(err.message);
       
    }
    
}

InitalizeConnection()