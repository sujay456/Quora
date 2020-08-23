const User=require('../models/user');
const Question=require('../models/question');
const Answer=require('../models/answer');
const Like=require('../models/like');
const Dislike=require('../models/dislike');
const Comment=require('../models/comment');
const { use } = require('passport');

module.exports.create=async function(req,res)
{
    console.log(req.body);

    try {

        let user=await User.findById(req.user.id);
        let question=await Question.findById(req.query.id);

        if(question)
        {
            let AnswerDone= await Answer.findOne({user:req.user.id,question:question.id});

            if(AnswerDone)
            {
                if(req.body.editable=='true')
                {
                    AnswerDone.answer=req.body.answer;

                    AnswerDone.save();

                    return res.status(200).json({
                        message:'Answer edited succesfully'
                    });
                }
                else
                {
                    console.log('You can not answer a question twice');
                    return res.status(403).json({
                        message:'You have already given your answer'
                    });
                }
            }
            else
            {
                let answer=await Answer.create({ answer:req.body.answer,user:req.user.id,question:question.id });
                console.log(answer);
                user.answers.push(answer);
                user.save();
                question.answersOnQuestion.push(answer);
                question.save();

                return res.status(200).json({
                    message:'Your answer is succesfully created'
                })
            }
        }
        else
        {
            return res.json(404,{
                message:'Question not found'
            });        
        }

        
    } catch (error) {
        console.log(error);
    }


}

module.exports.answer=function(req,res)
{
    return res.render('answers');
}

module.exports.delete=async function(req,res)
{
    try {
        
        let user=await User.findById(req.user.id);

        let answer=await Answer.findById(req.query.a_id);

        let question=await Question.findById(answer.question);

        if(answer)
        {
            if(answer.user==req.user.id)
            {

                user.answers.pull(answer.id);
                question.answersOnQuestion.pull(answer.id);
                await Like.deleteMany({likedon:answer.id});
                await Dislike.deleteMany({dislikedon:answer.id});

                await Comment.deleteMany({answer:answer.id});

                
                question.save();
                user.save();
                answer.remove();

                return res.status(200).json({
                    message:"Answer Deleted"
                });

            }
            else
            {
                return res.status(401).json({
                    message:'You are not Authorized to delete this answer'
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
