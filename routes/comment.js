const express=require('express');
const router=express.Router();
const CommentController=require('../controller/commentController');
const passport=require('passport');


router.post('/create',passport.CheckAuth,CommentController.CreateComment);

router.get('/delete',passport.CheckAuth,CommentController.delete);

module.exports=router;