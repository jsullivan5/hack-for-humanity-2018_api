const express = require('express');
const router = express.Router();

const WatsonAuthService = require(
  '../services/watson.auth.service'
);
const watsonAuthService = new WatsonAuthService();

router.get('/', (req, res) => {
   try {
    const token = watsonAuthService.authorize();
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
