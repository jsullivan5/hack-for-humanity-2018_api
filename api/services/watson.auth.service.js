const watson = require('watson-developer-cloud');

const config = require('../util/config');

class WatsonAuthService {
  constructor() {
    this.authorization = this._init();
  }

  _init() {
    return new watson.AuthorizationV1({
      username: config.watsonUserName,
      password: config.watsonPassword,
      url: watson.SpeechToTextV1.URL
    });
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
