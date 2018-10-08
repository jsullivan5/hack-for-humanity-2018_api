require('dotenv');

const watson = require('watson-developer-cloud');

const authorization = new watson.AuthorizationV1({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD,
  url: watson.SpeechToTextV1.URL
});


class WatsonAuthService {
  constructor() {
    this.authorization = authorization;
  }

  authorize() {
    return this.authorization.getToken(function (err, token) {
      if (!token) {
        throw new Error('Problem authorizing Watson');
      } else {
        return token;
      }
    });
  }
}

module.exports = WatsonAuthService; 
