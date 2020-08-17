const mongoose=require('mongoose');

const LikeSchema=new mongoose.Schema({

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likedon:
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

const Like=mongoose.model('Like',LikeSchema);

module.exports=Like;

