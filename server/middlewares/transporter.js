const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'smtp.elasticemail.com',
  secure: false,
  port: 2525,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
