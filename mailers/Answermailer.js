const nodemailer = require("../config/nodemailer");

const sendToAuthor = (answer) => {
  console.log("Answer mailer");
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
