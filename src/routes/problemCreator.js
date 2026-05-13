const express=require('express')
const { adminMiddleware } = require('../middleware/adminMiddleware')
const problemRouter=express.Router()
const {createProblem,updateProblem,deletedProblem,getProblemById,getAllProblem,solvedAllproblem}=require('../controller/userProblem');
const { userMiddleware } = require('../middleware/userMiddleware');
//create problem
problemRouter.post('/create',adminMiddleware,createProblem)
problemRouter.put('/update/:id',adminMiddleware,updateProblem)
problemRouter.delete('/delete/:id',adminMiddleware,deletedProblem)

// // //user access
problemRouter.get('/problemById/:id',userMiddleware,getProblemById)
problemRouter.get('/getAllProblem',userMiddleware,getAllProblem)
problemRouter.get('/SolvedAllProblem',userMiddleware,solvedAllproblem)

//fetch
//update 
//delete
module.exports=problemRouter