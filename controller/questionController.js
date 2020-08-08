const Question=require('../models/question');
const User =require('../models/user');

module.exports.CreateQuestion=async function(req,res)
{
    try {
        console.log(req.body);
    
        let user=await User.findById(req.user.id);
        if(user)
        {
            let question=await Question.create({question:req.body.question,user:req.user.id});
            
            let keywords=question.question.split(' ');

            for(let keyword of keywords)
            {
                question.keywords.push(keyword);
            }
            console.log(question);

            question.save();
            console.log(user);
            user.questions.push(question);
            user.save();
            return res.status(200).json({
                message:'Ok'
            });
        }
        else
        {
            return res.status(403,{
                message:'Not Authorised'
            });
        }

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}