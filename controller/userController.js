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

            // This redirect will be changed
            return res.redirect('back');

        }
    
    } catch (error) {
        console.log('Error in Sign up Controller',error);
        return res.json(500,{
            message:'Internal server Error'
        });
    }


}