const mongoose=require('mongoose');

const QuestionSchema=new mongoose.Schema({

    question:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    keywords:[
        {
            type:String,
            unique:true
        }
    ]

},{
    timestamps:true
});

const Question=mongoose.model('Question',QuestionSchema);

module.exports=Question;
