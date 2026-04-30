const axios=require('axios')

const getLanguageId=(lang)=>{
   
     const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()]
}

const submitBatch=async(submissions)=>{
    
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': '98b248ec1cmsh41b3b55b9f3f579p14e2a4jsnd51c2122d9cc',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData(){
    try{

        const response=await axios.request(options)
        return response.data
    }
    catch(err){
        console.error(err)
    }
}

return await fetchData()
}

const waiting=async(timer)=>{
   setTimeout(() => {
    return 1
   }, timer);
}
const submitToken=async(resultToken)=>{


const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '98b248ec1cmsh41b3b55b9f3f579p14e2a4jsnd51c2122d9cc',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
	  return response.data;
	} catch (error) {
		console.error(error);
	}
}
 
   while(true){
    const result= await fetchData();
    const isResult=result.submissions.every((k)=>k.status_id>2)
    if(isResult){
      return result.submissions;
    }
    await waiting(1000);
   }
}


module.exports={getLanguageId,submitBatch,submitToken}




