const User=require('../models/user');
const Answer=require('../models/answer');
const Question=require('../models/question');
const Follow =require('../models/follow');
const path=require('path');
const fs=require('fs');
const { use } = require('passport');

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

module.exports.avatar=async function(req,res)
{
    try {
        console.log('Avatar controller');
        let user=await User.findById(req.user.id); 
        User.uploadedAvatar(req,res,function(err){
            if(err)
            {
                console.log(err);
                return;
            }

            // console.log(req.file);
            // user.avatar=path.join(User.avatarPath,req.file.filename);
            
            if(req.file)
            {
                if(user.avatar)
                {
                    let avatarExist=fs.existsSync(path.join(__dirname,'..',user.avatar));
                    if(avatarExist)
                    {
                        if(user.avatar=="/uploads/user/avatar/Default.jpg")
                        {
                            user.avatar=User.avatarPath+'/'+req.file.filename;
                        }
                        else
                        {
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                            user.avatar=User.avatarPath+'/'+req.file.filename;
                        }
                    }
                    else
                    {   
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                    }
                }
                else
                {
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
            }
            user.save();
            return res.redirect('back');
            
        });

    } catch (error) {
        console.log(error);
    }
}