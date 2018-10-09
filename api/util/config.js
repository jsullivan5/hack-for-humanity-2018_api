module.exports = {
  // node environment variables
  environment: process.env.NODE_ENV || 'DEV',
  port: process.env.PORT || 5000,
  // Watson vars
  watsonUserName: process.env.SPEECH_TO_TEXT_USERNAME,
  watsonPassword: process.env.SPEECH_TO_TEXT_PASSWORD,
  // email vars
  emailClient: process.env.EMAIL_CLIENT,
  emailRecipient: process.env.EMAIL_RECIPIENT,
  emailSender: process.env.EMAIL_SENDER,
  emailPassword: process.env.EMAIL_PASSWORD,
};
