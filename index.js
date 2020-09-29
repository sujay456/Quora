const env = require("./config/environment");
const express = require("express");
const app = express();
const port = 8000;
const ExpressLayout = require("express-ejs-layouts");
const sassMiddlware = require("node-sass-middleware");
const logger = require("morgan");

require("./config/view-helper")(app);

app.use(logger(env.morgan.mode, env.morgan.options));
// requiring passport
const cookieParser = require("cookie-parser");
const session = require("express-session"); //we import this so that session cookie get created // because passport donot automatically create cookie ,express-cookie does

// so we need to require all the startegies in the index.js file
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const passportJWT = require("./config/passport-jwt");
const passportGoogle = require("./config/passport-google");
const passportFacebook = require("./config/passport-facebook");

const path = require("path");

// setting up sockets
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chatSocket").chatSocket(chatServer);

chatServer.listen(5000);

console.log("Chat server is listenning on the port :", 5000);

// including mongoose in this file
const db = require("./config/mongoose");
const mongoStore = require("connect-mongo")(session);
// For recieving the data in the body key of req
app.use(express.urlencoded());

// and we will be using this only development mode because here only coversion happens
// Middleware for sass

if (env.name == "development") {
  app.use(
    sassMiddlware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

// Middleware for Static Files
app.use(express.static(path.join(__dirname, env.asset_path)));
app.use("/uploads", express.static("./uploads"));

// Using the middleware to use Ejs -Layouts
app.use(ExpressLayout);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware for creating cookie from passport
app.use(cookieParser());
app.use(
  session({
    name: "Quora",
    secret: env.session_cookie_secret, //this is our encryption key
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuth);

// This is the middleware for the routes
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
    return;
  }

  console.log("Server is up and running on port :", port);
});

// IN THE JSON FILE WHERE WE INSERT A SCRIPT FOR PRODUCTION I.E PROD_START
// WE GET A ERROR SAYING NODE_PRODUCTION NOT A COMMAND, SO TO FIX THIS USE SET NODE_ENV .... (ONLY FOR WINDOWS)
// "prod_start": "SET NODE_ENV=production & nodemon index.js"
// ssh -i ~/Downloads/quora-prod.pem ubuntu@35.154.227.64
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
