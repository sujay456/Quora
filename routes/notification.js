const express=require('express');
const router=express.Router();
const NotificationController=require('../controller/notificationController');
const passport=require('passport');

router.get('/', passport.CheckAuth,NotificationController.notification);


module.exports=router;