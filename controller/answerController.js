const User=require('../models/user');
const Question=require('../models/question');
const Answer=require('../models/answer');

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
                console.log('You can not answer a question twice');
                return res.status(403).json({
                    message:'You have already given your answer'
                });
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
