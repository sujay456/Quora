const express=require('express');
const router=express.Router();
const LanguageController=require('../controller/languageController');

router.post('/save',LanguageController.LangSave);

module.exports=router;