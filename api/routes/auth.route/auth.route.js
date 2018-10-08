require('dotenv');

const express = require('express');
const router = express.Router();

const authorization = new watson.AuthorizationV1({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD,
  url: watson.SpeechToTextV1.URL
});

router.get('/', (req, res) => {
  try {
    authorization.getToken(function(err, token) {
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

module.exports = router;
