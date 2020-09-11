const express = require("express");
const router = express.Router();
const SettingController = require("../controller/settingController");

router.get("/reset-pass", SettingController.reset);

router.get("/reset-page", SettingController.resetPage);

router.post("/reset-submit", SettingController.submitForm);

module.exports = router;
