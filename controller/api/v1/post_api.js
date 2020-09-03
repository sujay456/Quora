const Question = require("../../../models/question");

module.exports.index = async function (req, res) {
  let questions = await Question.find({});
  return res.json(200, {
    message: "Hello world",
    questions: questions,
  });
};

module.exports.deleteQuestionsViaApi = async function (req, res) {
  try {
    let question = await Question.findById(req.query.id);

    if (req.user.id == question.user) {
      question.remove();
      return res.status(200).json({
        message: "Question deleted succesfully",
      });
    } else {
      return res.status(403).json({
        message: "You are not authorised to delete this question",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
