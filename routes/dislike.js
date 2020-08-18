const express=require('express');
const router=express.Router();
const passport=require('passport');
const DislikeController=require('../controller/dislikeController');

router.post('/toggle',passport.CheckAuth,DislikeController.ToggleDislike);



module.exports=router;