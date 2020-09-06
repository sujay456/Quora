const nodemailer = require("../config/nodemailer");

exports.newQuestion = (question) => {
  console.log("inside the mailer");

  let htmlString = nodemailer.renderedTemplate(
    { question: question },
    "/Questions/newQuestion.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "codingninjatest@gmail.com",
      to: question.user.email,
      subject: " Question  published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending the mail");
        return;
      }

      // info is the information about the sent  mail

      console.log(info);
      return;
    }
  );
};
