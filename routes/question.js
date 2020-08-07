const express=require('express');
const router=express.Router();
const QuestionController=require('../controller/questionController');

router.post('/create',QuestionController.CreateQuestion);

module.exports=router