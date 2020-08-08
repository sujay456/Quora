const mongoose=require('mongoose');

const QuestionSchema=new mongoose.Schema({

    question:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    answersOnQuestion:[
        {
            // This is the list of answers which is there on a particular question
            type:mongoose.Schema.Types.ObjectId,
            ref:'Answer'
        }
    ],
    keywords:[
        {
            type:String
        }
    ]

},{
    timestamps:true
});

const Question=mongoose.model('Question',QuestionSchema);

module.exports=Question;
