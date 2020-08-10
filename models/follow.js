const mongoose=require('mongoose');


const FollowSchema=new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
},
{
    timestamps:true
});

const Follow=mongoose.model('Follow',FollowSchema);

module.exports=Follow;