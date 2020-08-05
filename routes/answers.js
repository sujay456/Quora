const express=require('express');
const router=express.Router();
const AnswerController=require('../controller/answerController');
const passport=require('passport');

router.get('/', passport.CheckAuth,AnswerController.answer);


module.exports=router