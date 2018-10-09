const nodemailer = require('nodemailer');

const config = require('../util/config');
const logger = require('../util/logger');

class EmailService {
  static _createTransport() {
    return nodemailer.createTransport({
      service: config.emailClient,
      auth: {
        user: config.emailSender,
        pass: config.emailPassword,
      },
    });
  }

  static _formatOptions(message, recipientEmail) {
    return {
      from: 'sender@email.com', // sender address
      to: recipientEmail, // list of receivers, can be multiple if comma separated list
      subject: 'Message From reParent', // Subject line
      text: `${message}`, // plain text body
      html: `<p>${message}</p>`, // html text body
    };
  }

  sendEmail(message, recipientEmail) {
    // call static methods off the constructor within js classes
    const transporter = this.constructor._createTransport();
    const mailOptions = this.constructor._formatOptions(message, recipientEmail);

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return logger.debug('Message sent: %s', info.messageId);
    });
  }
}

module.exports = new EmailService();
