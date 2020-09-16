const User = require("../models/user");
const Answer = require("../models/answer");
const Question = require("../models/question");
const Follow = require("../models/follow");
const path = require("path");
const fs = require("fs");

module.exports.profile = async function (req, res) {
  try {
    console.log(req.query.id);
    let user = await User.findById(req.query.id);

    let answers = await Answer.find({ user: req.query.id }).populate(
      "question"
    );

    let questions = await Question.find({ user: req.query.id });

    let followsOfUser = await Follow.find({ user: req.query.id });
    let followed = false;
    for (let i of user.follower) {
      if (i == req.user.id) {
        followed = true;
      }
    }
    console.log(user, "user");
    await user.populate("follower following").execPopulate();
    return res.render("profile", {
      puser: user,
      answers: answers,
      questions: questions,
      follow: followsOfUser,
      followed: followed,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.question = function (req, res) {
  return res.redirect("/");
};

module.exports.avatar = async function (req, res) {
  try {
    console.log("Avatar controller");
    let user = await User.findById(req.user.id);
    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log(err);
        return;
      }

      // console.log(req.file);
      // user.avatar=path.join(User.avatarPath,req.file.filename);

      if (req.file) {
        if (user.avatar) {
          let avatarExist = fs.existsSync(
            path.join(__dirname, "..", user.avatar)
          );
          if (avatarExist) {
            if (user.avatar == "/uploads/user/avatar/Default.jpg") {
              user.avatar = User.avatarPath + "/" + req.file.filename;
            } else {
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
              user.avatar = User.avatarPath + "/" + req.file.filename;
            }
          } else {
            user.avatar = User.avatarPath + "/" + req.file.filename;
          }
        } else {
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
      }
      user.save();
      return res.redirect("back");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.following = async function (req, res) {
  try {
    // in the query i should recieve the used id of the person whom i am following
    // and we have already the id of the person who is following

    let follower = await User.findById(req.user.id);
    let following = await User.findById(req.query.id);

    if (follower.id != following.id) {
      for (let i of follower.following) {
        console.log(i);
        if (i == following.id) {
          follower.following.pull(following.id);
          following.follower.pull(req.user.id);
          follower.save();
          following.save();
          return res.status(200).json({
            message: "Follow",
            following: following,
          });
        }
      }
      follower.following.push(following);
      following.follower.push(follower);

      follower.save();
      following.save();
      return res.status(200).json({
        message: "Following",
        following: following,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.log("Error in following", error);
    return;
  }
};

module.exports.Forchat = async function (req, res) {
  try {
    let user = await User.findById(req.query.id);

    if (user) {
      return res.status(200).json({
        user: user,
      });
    } else {
      return res.status(500).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
