const User=require('../models/user');


module.exports.profile=async function(req,res)
{
    
    try {
        let user=await User.findById(req.user.id);

        return res.render('profile');

    } catch (error) {
        console.log("Error",error);
    }
}

module.exports.question=function(req,res)
{
    return res.redirect('/');
}