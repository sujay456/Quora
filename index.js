const express=require('express');
const app=express();
const port=8000;
const ExpressLayout=require('express-ejs-layouts');
const sassMiddlware=require('node-sass-middleware');



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
app.set('view engine','ejs');
app.set('views','./views');



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


