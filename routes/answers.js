const express=require('express');
const router=express.Router();
const AnswerController=require('../controller/answerController');
const passport=require('passport');

router.get('/', passport.CheckAuth,AnswerController.answer);

router.get('/delete',passport.CheckAuth,AnswerController.delete);

router.post('/create', passport.CheckAuth,AnswerController.create);
module.exports=router