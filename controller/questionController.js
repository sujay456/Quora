const Question=require('../models/question');

module.exports.CreateQuestion=async function(req,res)
{
    try {
        console.log(req.body);
    
        let question=await Question.create({question:req.body.question,user:req.user.id});
        
        let keywords=question.question.split(' ');

        for(let keyword of keywords)
        {
            question.keywords.push(keyword);
        }
        console.log(question);

        question.save();

        return res.status(200).json({
            message:'Ok'
        });

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}