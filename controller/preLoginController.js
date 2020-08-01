module.exports.home=function(req,res)
{
    // return res.send('This is your Home page');
    return res.render('preHomePage',{ layout:false });
}