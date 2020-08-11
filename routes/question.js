const express=require('express');
const router=express.Router();
const QuestionController=require('../controller/questionController');
const Question = require('../models/question');

router.post('/create',QuestionController.CreateQuestion);
router.get('/display',QuestionController.display);

module.exports=router