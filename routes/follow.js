const express=require('express');
const router=express.Router();

const FollowController=require('../controller/followController');

router.get('/toggle',FollowController.ToggleFollow);

module.exports=router