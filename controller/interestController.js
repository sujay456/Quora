const User=require('../models/user');


module.exports.SaveInterest=function(req,res)
{
    // console.log(req.body);
    // console.log(req.user);
    if(req.user)
    {
        User.findById(req.user.id,function(err,user)
        {
            if(err)
            {
                console.log('Error',err);
                return;
            }
            if(user)
            {
            let interest=Object.keys(req.body);
            // console.log(interest);
            for(let i of interest)
            {
                
                let found=user.interests.find(function(oneI){
                    return i==oneI;
                });
                if(!found)
                {
                    user.interests.push(i);
                }

            }
            user.save();
            return res.status(200).json({
                message:'Succesfull'
            });
            }
            
        });
    }
    else
    {
        return res.redirect('/');
    }


}