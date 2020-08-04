const User=require('../models/user');
const { use } = require('passport');

module.exports.LangSave=function(req,res)
{
    // console.log(req.body);

    if(req.user)
    {
        User.findById(req.user.id,function(err,user){
            if(err)
            {
                console.log('Error in finding the user',err);
                return;
            }

            let lang=Object.keys(req.body);

            for(let l of lang)
            {

                let found=user.languages.find(function(eachLang)
                {
                    return eachLang==l;
                });
                if(!found)
                {
                    user.languages.push(l);
                }
            
            }
            user.save();
            return res.status(200).json({
                message:'Succesfull'
            });
        });

    }
    else
    {

        console.log('User not signed in');
        return res.status(401).json({
            message:'You are not signed in/not authorised'
        });
    }
}