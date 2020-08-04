const User=require('../models/user');

// Checking the email
module.exports.checkEmail=function(req,res)
{
    // console.log(req.body);

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('error in findin the user',err);
        }
        // console.log(user);
        if(user)
        {
            return res.status(200).json({
                message:'Email Already exist',
                user:true
            });
        }
        else
        {
            return res.status(200).json({
                message:'Email Do not exist',
                user:false
            });
        }
    });

}


// Sign up
module.exports.signup=async function(req,res){

    console.log(req.body);

    try {
        let user=await User.findOne({email:req.body.email});

        if(user)
        {
            return res.status(400).json({
                message:'Email already exist',
                user:true
            });
        }
        else
        {
            await User.create({ name:req.body.name+' '+req.body.lastname,email:req.body.email,password:req.body.password });
            console.log('User created');
            // This redirect will be changed
            return res.status(200).json({
                message:'user created'
            });

            // return  res.render('preHomePage');
            
            

        }
    
    } catch (error) {
        console.log('Error in Sign up Controller',error);
        return res.json(500,{
            message:'Internal server Error'
        });
    }


}


module.exports.Home=function(req,res)
{
    // we have a middleware for checking Authentication 
    return res.render('postLoginHome');
}

module.exports.interest=function(req,res)
{
    return res.render('interest',{layout:'firstLayout'});
}


module.exports.createSession=function(req,res)
{
    console.log(req.user);
    if(req.user.interests.length==0)
    {    
        return res.redirect('/user/interest');
    }
    else
    {
        return res.redirect('/user/home');
    }
}