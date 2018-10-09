const watson = require('watson-developer-cloud');

const config = require('../util/config');

class WatsonAuthService {
  _getAuthClient() {
    return new watson.AuthorizationV1({
      username: config.watsonUserName,
      password: config.watsonPassword,
      url: watson.SpeechToTextV1.URL
    });
  }

  async authorize() {
    const authorization = this._getAuthClient();
    return new Promise((resolve, reject) => {
      authorization.getToken(async (err, token) => {
        if (!token) {
          reject(new Error('Problem authorizing Watson'));
        } else {
          resolve(token);
        }
      });
    })
  }
}

module.exports = new WatsonAuthService(); 
