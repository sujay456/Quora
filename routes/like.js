const express=require('express');
const router=express.Router();
const LikeController=require('../controller/likeController');
const passport=require('passport');

router.post('/create',passport.CheckAuth,LikeController.ToggleLike);

module.exports=router;