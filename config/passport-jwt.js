const passport = require("passport");
const User = require("../models/user");

const JWTStrategy = require("passport-jwt").Strategy;
const JWTExtract = require("passport-jwt").ExtractJwt;
const env = require("./environment");

const opts = {
  jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(opts, function (payload, done) {
    // here the payload is the decrypted user
    User.findById(payload._id, function (err, user) {
      if (err) {
        console.log("error in authentication", err);
        done(err);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

module.exports = passport;
