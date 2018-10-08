require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const watson = require('watson-developer-cloud');
const nodemailer = require('nodemailer');

const _ = require('lodash');

const authorization = new watson.AuthorizationV1({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD,
  url: watson.SpeechToTextV1.URL
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/auth', (req, res) => {
  try {
    authorization.getToken(function (err, token) {
      if (!token) {
        console.log('error:', err);
      } else {
        return res.status(200).send(token);
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/email', (req, res, next) => {
  const recipietEmail = _.get(req, 'body.recipientEmail', process.env.EMAIL_RECIPIENT);
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
      html: `<p>${message}</p>`// html text body
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return next(error);
      }

      return res.sendStatus(201);
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.listen(5000, () => {
  console.info(`iGen server is listening on port ${5000}`);
});
