const mongoose=require('mongoose')
async function main() {
    await mongoose.connect(process.env.DB_STRING_URL)
    
}
module.exports=main