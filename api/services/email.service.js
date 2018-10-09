const nodemailer = require('nodemailer');

const config = require('../util/config');
const logger = require('../util/logger');

class EmailService {
  _createTransport() {
    return nodemailer.createTransport({
      service: config.emailClient,
      auth: {
        user: config.emailSender,
        pass: config.emailPassword,
      }
    });
  }

  _formatOptions(message, recipientEmail) {
    return {
      from: 'sender@email.com', // sender address
      to: recipientEmail, // list of receivers, can be multiple if comma separated list
      subject: `Message From reParent`, // Subject line
      text: `${message}`, // plain text body
      html: `<p>${message}</p>` // html text body
    };
  }

  _transportSend(transporter, mailOptions) {;
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return new Error('Problem sending email.');
      }
      logger.debug('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      logger.debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }

  sendEmail(message, recipientEmail) {
    return nodemailer.createTestAccount(async (err, account) => {
      const transporter = this._createTransport();
      const mailOptions = this._formatOptions(message, recipientEmail);

      return this._transportSend(transporter, mailOptions);
    });
  }
}

module.exports = new EmailService();
