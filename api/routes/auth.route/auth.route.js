const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    authorization.getToken(function(err, token) {
      if (!token) {
        console.log('error:', err);
      } else {
        return res.status(200).send(token);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
