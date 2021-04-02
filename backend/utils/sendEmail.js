const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Thot" <noreply@thot.io>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  });

  console.log(`mail envoyer : ${info.messageId}`);
};

module.exports = sendEmail;
