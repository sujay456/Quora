const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const passport=require('passport');



router.post('/signup',userController.signup);
router.post('/checkemail',userController.checkEmail);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'}),userController.createSession);

router.get('/home',passport.CheckAuth,userController.Home);
router.get('/interest',passport.CheckAuth,userController.interest);
router.get('/signout',userController.signout);

module.exports=router;