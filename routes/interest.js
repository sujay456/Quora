const express=require('express');
const router=express.Router();
const InterestController=require('../controller/interestController');

router.post('/save',InterestController.SaveInterest);


module.exports=router;