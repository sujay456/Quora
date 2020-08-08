const mongoose=require('mongoose');

const AnswerSchema=new mongoose.Schema({

    answer:{
        type:String,
        required:true
    },
    user:{
        // it will store which user is writing the answer
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question:{
        // this will store on which question is this answer is being written 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }

});

const Answer=mongoose.model('Answer',AnswerSchema);

module.exports=Answer;