const queue = require("../config/kue");
const resetWorker = require("../workers/resetPass_worker");
const User = require("../models/user");
const Reset = require("../models/resetToken");
const crypto = require("crypto");

module.exports.resetPage = async function (req, res) {
  try {
    console.log(req.query);
    let reset = await Reset.findOne({ AccesToken: req.query.accesToken });

    if (reset && reset.isValid) {
      reset.isValid = !reset.isValid;
      reset.save();
      return res.render("ResetPassFormpage", {
        layout: false,
        user: reset.user,
      });
    } else {
      return res.render("unauthorised", { layout: false });
    }
  } catch (error) {
    console.log("Error in resetpage", error);
  }
};

module.exports.submitForm = function (req, res) {
  console.log(req.body);
  if (req.body.pass == req.body.cpass) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        console.log("Error in finding the user");
        return;
      }

      user.password = req.body.pass;
      user.save();

      return res.status(200).json({
        message: "Password changed Succesfully",
      });
    });
  } else {
    return res.status(403).json({
      message: "The passwords do not Match ",
    });
  }
};

module.exports.reset = async function (req, res) {
  //   console.log(req.query.email);

  try {
    let user = await User.findOne({ email: req.query.email });
    if (user) {
      let reset = await Reset.create({
        user: user.id,
        AccesToken: crypto.randomBytes(10).toString("hex"),
        isValid: true,
      });

      await reset.populate("user").execPopulate();
      console.log(reset);

      let job = queue
        .create("reset", reset)
        .priority("high")
        .save(function (err) {
          if (err) {
            console.log("Error in creating the job");
            return;
          }
          console.log("Job Enqueued", job.id);
        });
      return res.status(200).json({
        message: "Mail Sent",
      });
    } else {
    }
  } catch (error) {
    console.log("Error in the reset controller", err);
  }
};
