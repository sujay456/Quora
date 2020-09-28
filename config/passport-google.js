const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment");

passport.use(
  new googleStrategy(
    {
      clientID: env.google_clientID,
      clientSecret: env.google_clientSecret,
      callbackURL: env.google_callbackURL,
    },
    function (accessToken, refreshToke, profile, done) {
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (err) {
          console.log("Error in google oath");
          return done(err, false);
        }

        if (user) {
          console.log(profile);
          done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              avatar: profile.photos[0].value,
            },
            function (err, user) {
              if (err) {
                console.log("Error in creating the user in google oauth");
                return done(err, false);
              }
              console.log(profile);
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
