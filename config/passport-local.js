const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');


passport.use(new LocalStrategy({
    usernameField:'email',
},function(email,password,done){
    // console.log('hi');
    User.findOne({email:email},function(err,user){
        if(err)
        {
            console.log('Error',err);
            return done(err) ;
        }
        if(!user || user.password!=password)
        {
            
            return done(null,false);
        }
        
        // console.log(user);
        return done(null,user);
    });

}));

// serializer
// Here we are telling passport to use user's id to make the cookie
passport.serializeUser(function(user,done){
    console.log('Serialize');
   return done(null,user.id);

});


// deserializer
passport.deserializeUser(function(id,done){
    
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('Error',err);
            return done(err) ;
        }
        console.log('deserialize');
        return done(null,user);
    });
});

passport.CheckAuth=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        console.log('Authenticated');
        return  next();
    }
    console.log('not authenticated');
    return res.render('preHomePage',{layout:false});
}

passport.setAuth=function(req,res,next)
{
    // console.log('In set Auth');
    if(req.isAuthenticated())
    {
        // console.log('user',req.user);
        res.locals.user=req.user;
        
    }
    return next();
}

module.exports=passport;




