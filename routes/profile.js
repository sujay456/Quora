const express=require('express');
const router=express.Router();
const ProfileController=require('../controller/profileController');
const passport =require('passport');




router.get('/',passport.CheckAuth,ProfileController.profile);


module.exports=router