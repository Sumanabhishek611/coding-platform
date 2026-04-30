const {getLanguageId,submitBatch,submitToken}=require('../utils/problemutils')
const Problem=require('../models/problem')

const problemCreate = async (req, res) => {
    const { title, description, difficulty, 
        tags, visibletestcases, hiddentestcases,
         startCode,referenceSolution, problemCreator } = req.body

         
         try{
           for(const {language,completeCode} of referenceSolution){
              const languageId=getLanguageId(language)
              const submissions=visibletestcases.map((testCases)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testCases.input,
                expected_output:testCases.output
              }))
              const submitResult=await submitBatch(submissions)
              const resultToken=await submitResult.map((value)=>{value.token})
              const testResult=await submitToken(resultToken)
              
              for(const test of testResult){
                if(test.status_id!=3){
                  return res.status(400).send("error occured");
                }
              }

           }
           const userProblem=await Problem.create({
            ...req.body,
            problemCreator:req.result._id
           })
           res.status(201).send("Problem created successfully")
         }
         catch(err){
            res.send(err.message)
         }
}

module.exports=problemCreate