module.exports.home=function(req,res)
{
    
    if(req.user)
    {
        return res.redirect('/user/home');
    }
    else{
        return res.render('preHomePage',{ layout:false });
    }

    // return res.render('preHomePage',{ layout:false });

}