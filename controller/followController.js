const Question=require('../models/question');
const User=require('../models/user');
const Follow=require('../models/follow');

module.exports.ToggleFollow=async function(req,res)
{

    try {

        let user=await User.findById(req.user.id);

        if(user)
        {

            let question=await Question.findById(req.query.id);

            if(question)
            {
                let followExist=await Follow.findOne( { user:user.id,question:question.id} );

                if(followExist)
                {
                    user.follow.pull(followExist.id);
                    question.follow.pull(followExist.id);

                    user.save();
                    question.save();

                    followExist.remove();

                    return res.status(200).json({
                        message:'Succesfull unfollowed '
                    });
                }
                else
                {
                    let follow=await Follow.create({ user:user.id,question:question.id});

                    user.follow.push(follow);
                    question.follow.push(follow);

                    user.save();
                    question.save();

                    console.log(follow);

                    return res.status(200).json({
                        message:'Succesfull followed'
                    });
                }
                

            }
            else
            {
                return res.status(404).json({
                    message:'question not found'
                })
            }
        }
        else
        {
            return res.status(403).json({
                message:'You are not authorised'
            });
        }
        
    } catch (error) {
        console.log('Error in follow controller',error);
    }

}