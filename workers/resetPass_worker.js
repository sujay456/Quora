const queue = require("../config/kue");
const ResetMailer = require("../mailers/resetPassMailer");

queue.process("reset", function (job, done) {
  console.log(job.data);
  console.log("In the processing of job");
  ResetMailer.resetMail(job.data);

  done();
});
