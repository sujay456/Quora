const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const passport = require("passport");

router.post("/signup", userController.signup);
router.post("/checkemail", userController.checkEmail);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  userController.createSession
);

router.get("/home", passport.CheckAuth, userController.Home);
router.get("/interest", passport.CheckAuth, userController.interest);
router.get("/signout", userController.signout);

// for google oauth

// the route /auth/google is given by passport it will automatically recognise this is a google auth call
// in the scope u have to define what things u want in the call back
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userController.createSession
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  userController.createSession
);
module.exports = router;
