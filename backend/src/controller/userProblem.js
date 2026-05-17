const {getLanguageById,submitBatch,submitToken} = require("../utils/problemutils");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission=require("../models/submissions")
const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);
          console.log(resultToken);
          
        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);
       console.log(testResult);
       


       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}


const updateProblem=async(req,res)=>{
  const {id}=req.params;
  const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
        
      try{
        if(!id){
          return res.status(404).send("Missing id field");
        }
        const DsaProblem=await Problem.findById(id);
        if(!DsaProblem){
          res.status(404).send("id  is not present in server")
        }
        for(const {language,completeCode} of referenceSolution){
          const languageId=getLanguageById(language);
          const submissions=visibleTestCases.map((testcase)=>({
             source_code:completeCode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
          }))
          const submitResult=await submitBatch(submissions)
          const resultToken= submitResult.map((value)=>(value.token))
          const testResult=await submitToken(resultToken)

          for(const test of testResult){
            if(test.status_id!=3){
              return res.status(400).send("error occured")
            }
          }

        }
        const newProblem=await Problem.findByIdAndUpdate(id,{...req.body}, {runValidators:true, new:true})
        res.status(200).send(newProblem)
      } 
      catch(error){
          res.status(500).send(error)
      }  
    }

const deletedProblem=async(req,res)=>{
  const {id}=req.params;
  try{
    if(!id){
       return res.status(404).send("id field is missing")
    }
    const deletedProblem=await Problem.findByIdAndDelete(id);
    if(!deletedProblem){
      return res.status(404).send("Problem not found")
    }
    res.status(200).send("Problem deleted successfully")

  }
  catch(error){
      res.status(500).send(error)
  }

}

const getProblemById=async(req,res)=>{
  const {id}=req.params;
  try{
     if(!id){
       return res.status(400).send("Id is not valid")
     }
     const ans=await Problem.findById(id).select("_id title description difficultly tags visibleTestCases startCode referenceSolution");
     if(!ans){
      return res.status(404).send("problem is missing")

     }
      res.status(200).send(ans);
  }
  catch(error){
     res.status(500).send(error)
  }
}

const getAllProblem=async(req,res)=>{
  try{
    const ans=await Problem.find({}).select("_id title difficulty tags");
    if(!ans){
      return res.status(404).send("Problem not found")
    }
    res.status(200).send(ans)
  }
  catch(error){
     res.status(500).send(error)
  }
}

const solvedAllproblem=async(req,res)=>{
    try{

        const userId=req.result._id
        const user=await User.findById(userId).populate({
            path:'problemSolved',
            select:"_id title difficulty tags"
        })
        res.status(201).send(user.problemSolved)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const SubmittedProblem=async(req,res)=>{
  try{

    const userId=req.result._id;
    const problemId=req.params.pid
    
    
    const ans=await Submission.find({userId,problemId})
  
    
    if(ans.length==0){
      res.status(200).send("No submission found")
    }
    res.status(200).send(ans);
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

module.exports={createProblem,updateProblem,deletedProblem,getProblemById,getAllProblem,solvedAllproblem,SubmittedProblem}