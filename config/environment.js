const fs = require("fs");

const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// access.log is the file name
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "assets",
  session_cookie_secret: "blahsomething",
  db: "Quora-development",
  smtp: {
    service: "gmail",
    secure: false,
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "codingninjatest@gmail.com",
      pass: "uafppoqwoknrdcpy",
    },
  },
  google_clientID:
    "127440696413-4ukr81g5s88qo7cltahm62r7n7bae4gc.apps.googleusercontent.com",
  google_clientSecret: "vtaTOFR0NBnBGQW2yG0Ka5rS",
  google_callbackURL: "http://localhost:8000/user/auth/google/callback",
  facebook_clientID: "341961380511252",
  facebook_clientSecret: "e279799025e7533c41674528db5c6dec",
  facebook_callbackURL: "http://localhost:8000/user/auth/facebook/callback",
  jwt_secret: "quora",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },
};

const production = {
  name: process.env.QUORA_ENVIRONMENT,
  asset_path: process.env.QUORA_ASSETS_PATH,
  session_cookie_secret: process.env.QUORA_SESSION_COOKIE,
  db: process.env.QUORA_DB,
  smtp: {
    service: "gmail",
    secure: false,
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "codingninjatest@gmail.com",
      pass: "uafppoqwoknrdcpy",
    },
  },
  google_clientID: process.env.QUORA_GOOGLE_CLIENTID,
  google_clientSecret: process.env.QUORA_GOOGLE_CLIENTSECRET,
  google_callbackURL: process.env.QUORA_GOOGLE_CALLBACK,
  facebook_clientID: process.env.QUORA_FACEBOOK_CLIENTID,
  facebook_clientSecret: process.env.QUORA_FACEBOOK_CLIENTSECRET,
  facebook_callbackURL: process.env.QUORA_FACEBOOK_CALLBACK,
  jwt_secret: process.env.QUORA_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },
};

module.exports =
  eval(process.env.QUORA_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.QUORA_ENVIRONMENT);

// module.exports = development;
