const queue = require("../config/kue");

const questionMailer = require("../mailers/Questionmailer");
const AnswerMailer = require("../mailers/Answermailer");

queue.process("emails", function (job, done) {
  console.log(job.data);
  if (job.data.type == "question") {
    questionMailer.newQuestion(job.data.question);
    done();
  } else {
    AnswerMailer.sendToAuthor(job.data.answer);
    done();
  }
});
