const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  }
});
console.log('Transporter:', transporter); // Add this line

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email: ' + error.message);
  }
};

module.exports = { sendEmail };
