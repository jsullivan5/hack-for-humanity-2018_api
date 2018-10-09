const express = require('express');
const _ = require('lodash');

const emailService = require('../services/email.service');
const config = require('../util/config');

const router = express.Router();

// TODO: Refactor this to use a real email client e.g. Sendgrid / Mailchimp

router.post('/', (req, res, next) => {
  const message = _.get(req, 'body.message', 'Some one loves you....');
  const recipientEmail = _.get(req, 'body.recipientEmail', config.emailRecipient);

  try {
    emailService.sendEmail(message, recipientEmail);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
