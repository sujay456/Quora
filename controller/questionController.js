const Question = require("../models/question");
const User = require("../models/user");
const Follow = require("../models/follow");
const Like = require("../models/like");
const Dislike = require("../models/dislike");
// const questionMailer = require("../mailers/Questionmailer");

const queue = require("../config/kue");
const EmailWorker = require("../workers/email_worker");

module.exports.CreateQuestion = async function (req, res) {
  try {
    console.log(req.body);

    let user = await User.findById(req.user.id);
    if (user) {
      let question = await Question.create({
        question: req.body.question,
        user: req.user.id,
      });

      await question.populate("user").execPopulate();
      let keywords = question.question.split(" ");

      for (let keyword of keywords) {
        question.keywords.push(keyword);
      }

      question.save();
      console.log(user);
      user.questions.push(question);
      user.save();
      console.log(question);

      // questionMailer.newQuestion(question);
      // what create will do is if there is no queue for the this work it will create it
      // or if there is a queueu then it will append to it
      let job = queue
        .create("emails", { question, type: "question" })
        .save(function (err) {
          if (err) {
            console.log("Error in enquing the job");
            return;
          }
          console.log("Job enqueued ", job.id);
        });

      return res.status(200).json({
        message: "Ok",
      });
    } else {
      return res.status(403, {
        message: "Not Authorised",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.display = async function (req, res) {
  try {
    let question = await Question.findById(req.query.id).populate({
      path: "answersOnQuestion",
      populate: {
        path: "user comments",
        populate: {
          path: "user",
        },
      },
    });

    let questionALL = await Question.find({});
    if (question) {
      console.log(question);
      let userAnswer = {};
      let userBool = false;
      for (let answer of question.answersOnQuestion) {
        // console.log(answer);
        if (answer.user.id == req.user.id) {
          userAnswer = answer;
          userBool = true;
        }
      }
      console.log(userAnswer, userBool);
      let followsOfUser = await Follow.find({ user: req.user.id });
      let like = await Like.find({ user: req.user.id });
      let dislike = await Dislike.find({ user: req.user.id });

      console.log(dislike);
      return res.render("question", {
        question: question,
        follow: followsOfUser,
        userAnswer: userAnswer,
        userBool: userBool,
        questionALL: questionALL,
        like: like,
        dislike: dislike,
        extractStyles: true,
      });
    }
  } catch (error) {
    console.log("Error in displaying the question page");
  }
};
