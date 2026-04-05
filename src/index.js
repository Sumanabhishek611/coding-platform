const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const express =require('express')
const app=express()
const main=require('./config/db')
const cookieParser=require('cookie-parser')


app.use(express.json())
app.use(cookieParser())

main()
.then(async() => {
    app.listen(process.env.PORT,()=>{
        console.log("Server is listening at port number "+process.env.PORT)
    })
}).catch((err) => {
     console.log(err);
});