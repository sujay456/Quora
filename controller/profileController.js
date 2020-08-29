const User=require('../models/user');
const Answer=require('../models/answer');
const Question=require('../models/question');
const Follow =require('../models/follow');

module.exports.profile=async function(req,res)
{
    
    try {
        let user=await User.findById(req.user.id);

        let answers=await Answer.find({user:user.id}).populate('question');

        let questions=await Question.find({user:user.id});  

        let followsOfUser=await Follow.find({user:req.user.id});


        return res.render('profile',
        {
            answers:answers,
            questions:questions,
            follow:followsOfUser
        });

    } catch (error) {
        console.log("Error",error);
    }
}

module.exports.question=function(req,res)
{
    return res.redirect('/');
}