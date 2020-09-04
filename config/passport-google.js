const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "127440696413-4ukr81g5s88qo7cltahm62r7n7bae4gc.apps.googleusercontent.com",
      clientSecret: "vtaTOFR0NBnBGQW2yG0Ka5rS",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
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
