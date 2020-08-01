const express=require('express');
const router=express.Router();
const PreController=require('../controller/preLoginController');

router.get('/',PreController.home);

module.exports=router;