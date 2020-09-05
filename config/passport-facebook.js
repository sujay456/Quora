// app id -341961380511252
// app-secret-e279799025e7533c41674528db5c6dec
// app-callback-http://localhost:8000/user/auth/facebook/callback

const passport = require("passport");
const facebookStartegy = require("passport-facebook").Strategy;
const User = require("../models/user");
const crypto = require("crypto");
const randomEmail = require("random-email");

passport.use(
  new facebookStartegy(
    {
      clientID: "341961380511252",
      clientSecret: "e279799025e7533c41674528db5c6dec",
      callbackURL: "http://localhost:8000/user/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accesToke, refreshToken, profile, done) {
      console.log(profile);

      User.findOne({ facebookID: profile.id }, function (err, user) {
        if (err) {
          console.log("Error in Faceboook oath");
          return done(err, false);
        }

        if (user) {
          console.log(profile);
          done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.email ? profile.email : randomEmail(),
              facebookID: profile.id,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error in creating the user in Facebook oauth");
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
