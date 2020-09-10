const nodemailer = require("../config/nodemailer");
var inLineCss = require("nodemailer-juice");

const resetMail = (reset) => {
  console.log("in the reset mailer", reset);

  nodemailer.transporter.use("compile", inLineCss());

  let htmlString = nodemailer.renderedTemplate(
    { reset: reset },
    "/resetPass/reset.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "codingninjatest@gmail.com",
      to: reset.user.email,
      subject: "Reset Your Password",
      html: htmlString,
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending the mail for reser password");
        return;
      }

      console.log(info);
      return;
    }
  );
};

module.exports = {
  resetMail: resetMail,
};
