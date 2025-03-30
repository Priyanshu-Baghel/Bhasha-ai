const dotenv = require("dotenv");
dotenv.config();
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

console.log(process.env.SMTP_PASSWORD);
console.log(process.env.SMTP_MAIL);

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: 'gmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {

  try {
      const { email, username } = req.body;
      console.log(email, username );

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Acknowledgement Email from Bhasha.ai',
    text: 'Thank you for SignUp in Bhasha.ai',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
    } catch (error) {
        console.error(error);
    };
  
});

module.exports = { sendEmail };
