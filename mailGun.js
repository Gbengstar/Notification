const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// email template

const emailTemplateSource = fs.readFileSync(
  path.join(__dirname, '/template.hbs'),
  'utf8'
);

const template = handlebars.compile(emailTemplateSource);

const htmlToSend = template({ message });

const mailgunAuth = {
  auth: {
    api_key: process.env.MG_KEY,
    domain: process.env.DOMAIN,
  },
};
//
const transporter = nodemailer.createTransport(mg(mailgunAuth));

const mailGunText = (email, subject, message) => {
  //

  const mailOptions = {
    from: `${process.env.MAIL_FROM}`,
    to: email,
    subject: subject,
    text: message,
  };
  
  return transporter.sendMail(mailOptions)
  // return new Promise((resolve, reject)=>{


  //   const mail = transporter.sendMail(mailOptions,)

  //   resolve(mail)
  // })
    
  // //(error, response) => {
  // //   if (error) {
  // //     console.log(error);
  // //   } else {
  // //     console.log('Successfully sent email.');
  // //   }
  // // });
}

//html

const mailGunHtml = (email, subject, message) => {
  //

  const mailOptions = {
    from: `${process.env.MAIL_FROM}`,
    to: email,
    subject: subject,
    html: htmlToSend,
  };

  return transporter.sendMail(mailOptions)
};

module.exports = { mailGunText, mailGunHtml };
