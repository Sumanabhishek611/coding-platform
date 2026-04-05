const mongoose=require('mongoose')
async function main() {
    await mongoose.connect(process.env.URL)
    console.log("db connected");
    
}
module.exports=main