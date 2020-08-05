const express=require('express');
const router=express.Router();
const PreController=require('../controller/preLoginController');



router.get('/',PreController.home);


// All the other routes

router.use('/user',require('./user'));
router.use('/interest',require('./interest'));

router.use('/language',require('./language'));
router.use('/answers',require('./answers'));
router.use('/notification',require('./notification'));


module.exports=router;