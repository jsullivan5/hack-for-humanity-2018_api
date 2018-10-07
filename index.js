require('dotenv').config();

const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');

const watson = require('watson-developer-cloud');

const authorization = new watson.AuthorizationV1({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD,
  url: watson.SpeechToTextV1.URL
});

const app = express();

app.use(bodyParser.json());

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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.listen(5000, () => {
  console.info(`iGen server is listening on port ${5000}`);
});
