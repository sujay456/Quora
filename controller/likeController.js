const Answer=require('../models/answer');
const Comment=require('../models/comment');
const Like=require('../models/like');
const User = require('../models/user');
const Dislike = require('../models/dislike');

module.exports.ToggleLike=async function(req,res)
{
    try {
        let on;

        let removed=false;
        let removedDislike=false;
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

        let likeAlreadyExist=await Like.findOne({ user:req.user.id,likedon:req.query.id,onModel:req.body.type});

        let dislikeAlreadyExist=await Dislike.findOne({ user:req.user.id,dislikedon:req.query.id,onModel:req.body.type});
        // console.log('on',on);
        // console.log('like',likeAlreadyExist);

        if(!likeAlreadyExist)
        {
            if(dislikeAlreadyExist)
            {
                let id=dislikeAlreadyExist._id;

                on.dislike.pull(id);
                

                user.dislike.pull(id);

                removedDislike=true;

                dislikeAlreadyExist.remove();
            }
            let like=await Like.create({ user:req.user.id,likedon:req.query.id,onModel:req.body.type});

            on.like.push(like);
            user.like.push(like);
            user.save();
            on.save();
        }
        else
        {
            let id=likeAlreadyExist._id;

            on.like.pull(id);
            on.save();

            user.like.pull(id);

            removed=true;

            likeAlreadyExist.remove();

        }

        return res.status(200).json({
            removed:removed,
            removedDislike:removedDislike,
            numberOfLikes:on.like.length
        });

    } catch (error) {
        console.log(error);
    }


}
