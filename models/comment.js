const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({

    comment:{
        type:String,
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    answer:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
    },
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ],
    dislike:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Dislike'
        }
    ]
},
{
    timestamps:true
});

const Comment=mongoose.model('Comment',CommentSchema);

module.exports=Comment;