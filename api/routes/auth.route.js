const express = require('express');

const router = express.Router();

const watsonAuthService = require('../services/watson.auth.service');

router.get('/', async (req, res, next) => {
  try {
    const token = await watsonAuthService.authorize();
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
