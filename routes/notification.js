const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/notificationController");
const passport = require("passport");

router.get("/", passport.CheckAuth, NotificationController.notification);

router.post("/create", passport.CheckAuth, NotificationController.create);

router.get("/deleteAll", NotificationController.deleteAll);

module.exports = router;
