const {getLanguageId,submitBatch}=require('../utils/problemutils')

const problemCreate = async (req, res) => {
    const { title, description, difficulty, 
        tags, visibletestcases, hiddentestcases,
         startCode,referenceSolution, prohlemCreator } = req.body

         
         try{
           for(const {language,completeCode} of referenceSolution){
              const languageId=getLanguageId(language)
              const submissions=visibletestcases.map((input,output)=>({
                source_code:completeCode,
                language_id:languageId,
                std_input:input,
                expected_output:output
              }))
              const submitResult=await submitBatch(submissions)
           }
         }
         catch(err){
            res.send(err.message)
         }
}