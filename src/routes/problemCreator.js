const express=require('express')
const { adminMiddleware } = require('../middleware/adminMiddleware')
const problemRouter=express.Router()
const problemCreate=require('../controller/userProblem')
//create problem
problemRouter.post('/create',adminMiddleware,problemCreate)
// problemRouter.post('/:id',problemUpdate)
// problemRouter.post('/:id',problemDelete)

// //user access
// problemRouter.get('/:id',problemFetch)
// problemRouter.get('/',getAllproblem)
// problemRouter.get('/user',solvedproblem)

//fetch
//update 
//delete
module.exports=problemRouter