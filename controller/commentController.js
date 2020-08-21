const User=require('../models/user');
const Answer=require('../models/answer');
const Comment=require('../models/comment');
const { use } = require('passport');

module.exports.CreateComment=async  function(req,res)
{
    try {
        let user=await User.findById(req.user.id);

        if(user)
        {

            let answer= await Answer.findById(req.query.id);

            if(answer)
            {

                let comment=await Comment.create({comment:req.body.comment,user:user.id,answer:req.query.id});

                console.log(comment);
                user.comments.push(comment);
                answer.comments.push(comment);
                user.save();
                answer.save();

                comment=await comment.populate('user').execPopulate();

                return res.json(200,{
                    data:{
                        comment:comment
                    },
                    message:'Comment posted succesfully'
                });
            }
            else
            {
                return res.json(404,{
                    message:'Answer not found'
                });
            }


        }
        else{
            return res.json(403,{
                message:'YOU are not indentified'
            });
        }


    } catch (error) {
        console.log('Error in creating the comment',error);
    }
}

module.exports.UpdateComment=async function(req,res)
{
    try {
        
        let user=await User.findById(req.user.id);

        if(user)
        {

            let edittedComment=await Comment.findByIdAndUpdate(req.query.id,{comment:req.body.editedComment});

            console.log(edittedComment);

            return res.status(200).json({
                message:'Succesfully Updated The comment',
                comment:edittedComment
            });

        }
        else
        {
            return res.status(401).json({
                message:'You are not signed in'
            })
        }


    } catch (error) {
        console.log(error);
    }
}

module.exports.delete=async function(req,res)
{
    // i will be having the id of the comment and the answer via the query

    try {
        
        let user=await User.findById(req.user.id);
        let answer=await Answer.findById(req.query.a_id);

        if(answer)
        {
            let comment=await Comment.findById(req.query.c_id);

            if(comment)
            {
                if(comment.user==req.user.id)
                {
                    user.comments.pull(comment.id);
                    answer.comments.pull(comment.id);

                    comment.remove();

                    user.save();
                    answer.save();

                    return res.status(200).json({
                        message:'Comment Deleted'
                    });
                }
                else
                {
                    return res.status(403).json({
                        message:'You are not authorized to delete this comment'
                    });
                }
            }
            else
            {
                return res.status(404).json({
                    message:'Comment not found'
                });
            }
        }
        else
        {
            return res.status(404).json({
                message:'Answer not found'
            });
        }
        

    } catch (error) {
        console.log(error);
    }
}