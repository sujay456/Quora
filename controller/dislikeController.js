const User=require('../models/user');
const Answer=require('../models/answer');
const Comment=require('../models/comment');
const Dislike=require('../models/dislike');
const Like = require('../models/like');

module.exports.ToggleDislike=async function(req,res)
{
    try {

        let on;

        let removed=false;
        let removedLike=false;
        console.log(req.query.id,req.body);
        let user=await User.findById(req.user.id);
        if(req.body.type=='Answer')
        {
            on =await Answer.findById(req.query.id);
        }
        else
        {
            on=await Comment.findById(req.query.id);
        }

        let dislikeAlreadyExist=await Dislike.findOne({ user:req.user.id,dislikedon:req.query.id,onModel:req.body.type});
        let likeAlreadyExist=await Like.findOne({ user:req.user.id,likedon:req.query.id,onModel:req.body.type})
        // console.log('on',on);
        // console.log('like',likeAlreadyExist);

        if(!dislikeAlreadyExist)
        {
            if(likeAlreadyExist)
            {
                removedLike=true;
            }
            let dislike=await Dislike.create({ user:req.user.id,dislikedon:req.query.id,onModel:req.body.type});

            on.dislike.push(dislike);
            user.dislike.push(dislike);
            user.save();
            on.save();
        }
        else
        {
            let id=dislikeAlreadyExist._id;

            on.dislike.pull(id);
            on.save();

            user.dislike.pull(id);

            removed=true;

            dislikeAlreadyExist.remove();

        }

        return res.status(200).json({
            removed:removed,
            removedLike:removedLike,
            numberOfDisLikes:on.dislike.length
        });



    } catch (error) {
        console.log(error);
    }
}