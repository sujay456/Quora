const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const AVATAR_PATH = path.join("/uploads/user/avatar");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    facebookID: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    questions: [
      {
        // this is the list of question that this user has asked
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    answers: [
      {
        // this is the list of answers that this user has written
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    interests: [
      {
        type: String,
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    follow: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follow",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    dislike: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dislike",
      },
    ],
    avatar: {
      type: String,
      default: "/uploads/user/avatar/Default.jpg",
    },
    // here it will store , to whom the user is following
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // it will store all the followers
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
