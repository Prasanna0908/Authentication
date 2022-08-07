// const nodemailer = require("nodemailer");

// const sendEmail = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',

//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },

//   });

//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: options.to,
//     subject: options.subject,
//     html: options.text,
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendMail = (options) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sprasanna0908@gmail.com',
    pass: 'qvvngihubddcytmj'
  }
});

var mailOptions = {
  from: 'sprasanna0908@gmail.com',
  to: options.to,
  subject: options.subject,
  html: options.text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = sendMail