const express = require('express');

const router = express.Router();

app.post('/email', (req, res, next) => {
  const recipietEmail = _.get(
    req,
    'body.recipientEmail',
    process.env.EMAIL_RECIPIENT
  );
  const message = _.get(req, 'body.message', 'Some one loves you....');

  nodemailer.createTestAccount(async (err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: 'sender@email.com', // sender address
      to: recipietEmail, // list of receivers
      subject: `Message From reParent`, // Subject line
      text: `${message}`, // plain text body
      html: `<p>${message}</p>` // html text body
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return next(error);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
      return res.sendStatus(201);
    });
  });
});

module.exports = router;
