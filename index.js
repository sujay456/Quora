const express=require('express');
const app=express();
const port=8000;
const ExpressLayout=require('express-ejs-layouts');
const sassMiddlware=require('node-sass-middleware');
// requiring passport
const cookieParser = require('cookie-parser');
const session=require('express-session');         //we import this so that session cookie get created // because passport donot automatically create cookie ,express-cookie does
const passport=require('passport');
const passportLocal=require('./config/passport-local');
// including mongoose in this file
const db=require('./config/mongoose');
const mongoStore=require('connect-mongo')(session);
// For recieving the data in the body key of req
app.use(express.urlencoded());



// Middleware for sass
app.use(sassMiddlware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));
                              

// Middleware for Static Files
app.use(express.static('./assets'));


// Using the middleware to use Ejs -Layouts
app.use(ExpressLayout);

app.set('layout','layouts');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');


// Middleware for creating cookie from passport
app.use(cookieParser());
app.use(session({
    name:'Quora',
    secret:'blahsomething',  //this is our encryption key
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuth);



// This is the middleware for the routes
app.use('/',require('./routes/index')); 





app.listen(port,function(err){
    if(err)
    {
        console.log('Error in running the server');
        return;
    }

    console.log("Server is up and running on port :",port);
});


