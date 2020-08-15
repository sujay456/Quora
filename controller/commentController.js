const User=require('../models/user');
const Answer=require('../models/answer');
const Comment=require('../models/comment');

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