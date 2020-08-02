module.exports.home=function(req,res)
{
    
    if(req.user)
    {
        return res.render('postLoginHome');
    }
    else{
        return res.render('preHomePage',{ layout:false });
    }

    // return res.render('preHomePage',{ layout:false });

}