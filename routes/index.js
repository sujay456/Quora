const express=require('express');
const router=express.Router();
const PreController=require('../controller/preLoginController');



router.get('/',PreController.home);


// All the other routes

router.use('/user',require('./user'));
router.use('/interest',require('./interest'));
router.use('/question',require('./question'));
router.use('/language',require('./language'));
router.use('/answers',require('./answers'));
router.use('/notification',require('./notification'));
router.use('/follow',require('./follow'));
router.use('/comment',require('./comment'));
router.use('/like',require('./like'));
router.use('/dislike',require('./dislike'));
router.use('/profile',require('./profile'));

module.exports=router;