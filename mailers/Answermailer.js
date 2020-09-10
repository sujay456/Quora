const nodemailer = require("../config/nodemailer");
var inLineCss = require("nodemailer-juice");
const sendToAuthor = (answer) => {
  console.log("Answer mailer");

  nodemailer.transporter.use("compile", inLineCss());
  let htmlString = nodemailer.renderedTemplate(answer, "/Answer/newAnswer.ejs");

  nodemailer.transporter.sendMail(
    {
      from: "codingninjatest@gmail.com",
      to: answer.user.email,
      subject: "New Answer Published",
      html: htmlString,
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending mail in newAnswer of answer");
        return;
      }

      console.log(info);
    }
  );
};

module.exports = {
  sendToAuthor: sendToAuthor,
};
