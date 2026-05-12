
const Submission=require('../models/submissions')
const Problem=require('../models/problem')
const { getLanguageById, submitBatch, submitToken } = require('../utils/problemutils')
const submitCode=async(req,res)=>{

    try{
        const problemId=req.params.id
        const userId=req.result._id
        const {code ,language}=req.body
       
        if(!userId || !problemId || !code || !language)
            return res.status(400).send("some field are missing")

        const problem=await Problem.findById(problemId)
        const submittedResult= await Submission.create({
            userId,
            problemId,
            code,
            language,
            status:"pending",
            testCasesTotal:problem.hiddenTestCases.length
        })
        const languageId=getLanguageById(language)
        const submissions=problem.hiddenTestCases.map((testcase)=>({
            source_code:code,
            language_id:languageId,
            stdin:testcase.input,
            expected_ouput:testcase.output
        }))
        const submitResult=await submitBatch(submissions)
        const resultToken=submitResult.map((value)=>value.token)
        const testResult=await submitToken(resultToken)
        // submittedResult ko update karo
        let testCasesPassed=0;
        let runtime=0
        let memory=0
        let status='accepted'
        let errorMessage=null

        for(let test of testResult){
            if(test.status_id==3){
                testCasesPassed++;
                runtime=runtime+parseFloat(test.time);
                memory=Math.max(memory,test.memory)
            }
            else{
                if(test.status_id==4){
                    status='error'
                    errorMessage=test.stderr
                }
                else{
                    status='error'
                    errorMessage=test.stderr
                }
            }
        }
         // Store the result in Database in Submission
         submittedResult.status=status
         submittedResult.runtime=runtime
         submittedResult.memory=memory
         submittedResult.testCasesPassed=testCasesPassed
         submittedResult.errorMessage=errorMessage

         await submittedResult.save()
         res.status(201).send(submittedResult)
    }
    catch(err){
       res.status(500).send(err.message)
    }
}


module.exports=submitCode