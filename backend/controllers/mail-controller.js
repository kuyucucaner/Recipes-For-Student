const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully'); // Konsolda bilgi almak için
  } catch (error) {
    console.error('Error sending email:', error.message); // Detaylı hata mesajını görmek için
    throw new Error('Error sending email: ' + error.message);
  }
};

module.exports = { sendEmail };
