const User = require("../models/user");
const Notification = require("../models/notifications");

module.exports.notification = function (req, res) {
  Notification.find({ user: req.user.id })
    .sort([["createdAt", -1]])
    .exec(function (err, noties) {
      if (err) {
        console.log("Error in finding notifications");
        return;
      }

      return res.render("notification", {
        noties: noties,
      });
    });
};

module.exports.create = function (req, res) {
  Notification.create({ mssg: req.body.mssg, user: req.user.id }, function (
    err,
    noti
  ) {
    if (err) {
      console.log("Error in creating notifications", err);
      return;
    }

    console.log(noti);

    return res.status(201).json({
      message: "succefully created notification",
    });
  });
};

module.exports.deleteAll = function (req, res) {
  Notification.deleteMany({ user: req.user.id }, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    return res.status(200).json({
      message: "Notifications cleared",
    });
  });
};
