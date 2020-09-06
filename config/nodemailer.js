const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

// in this file we are making only the transporter
// and the ejs setup

// transporter is the one who is going to send the email as name comply

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "codingninjatest@gmail.com",
    pass: "uafppoqwoknrdcpy",
  },
});

// here we will config for the ejs template

let renderedTemplate = (data, relativePath) => {
  let mailHTML;

  ejs.renderFile(
    path.join(__dirname, "../views/mailer", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in creating the template", err);
        return;
      }
      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderedTemplate: renderedTemplate,
};
