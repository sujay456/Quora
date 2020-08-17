const mongoose=require('mongoose');

const DislikeSchema=new mongoose.Schema({

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dislikedon:
    {
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true
    },
    onModel:{
        type:String,
        required:true,
        enum:['Answer','Comment']
    }
});

const Dislike=mongoose.model('Like',DislikeSchema);

module.exports=Dislike;
