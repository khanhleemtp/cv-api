const nodemailer = require('nodemailer');

console.log(process.env.EMAIL_HOST);

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    //Active in gmail "less secure app" options
  });

  transporter.verify((err, success) => {
    if (err) console.error(err);
    else console.log('Config correct');
  });
  // 2. Define the email options
  const mailOptions = {
    from: 'LD Khanh <hello@ldkhanh>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
    // html: '<h2>Hello World</h2>',
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
