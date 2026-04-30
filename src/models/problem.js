const mongoose=require('mongoose')
const Schema=mongoose.Schema

const problemSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
       type:String,
       required:true
    },
    difficulty:{
        type:String,
        required:true,
        enum:['easy','medium','hard']
    },
    tags:{
        type:String,
        enum:['Array','linked list','graph','dp'],
        required:true,

    },
    visibletestcases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String
            },
            explanation:{
                type:String,
                required:true
            }
        },
    ],
    hiddentestcases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startCode:[
        {
            language:{
                type:String,
                required:true,
            },
            initialCode:{
                type:String,
                required:true,
            }
        }
    ],
    referenceSolution:[
        {
            language:{
                type:String,
                required:true,
            },
            completeCode:{
                type:String,
                required:true,
            }
        }
    ],
    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

const Problem=mongoose.model('prblem',problemSchema)
module.exports=Problem

