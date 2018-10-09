module.exports = {
  // node environment variables
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  // Watson vars
  watsonUserName: process.env.SPEECH_TO_TEXT_USERNAME,
  watsonPassword: process.env.SPEECH_TO_TEXT_PASSWORD,
  // email vars
  emailClient: process.env.EMAIL_CLIENT,
  emailRecipient: process.env.EMAIL_RECIPIENT,
  emailSender: process.env.EMAIL_SENDER,
  emailPassword: process.env.EMAIL_PASSWORD,
};