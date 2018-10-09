require('dotenv').config(); // allow acccess to env vars in app

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./util/logger');
const config = require('./util/config');

const watsonAuthRouter = require('./routes/auth.route');
const emailRouter = require('./routes/email.route');

const port = config.port;

const app = express();

// global middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routing
app.use('/auth', watsonAuthRouter);
app.use('/email', emailRouter);

// global error handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.listen(port, () => {
  logger.info(`iGen server is listening on port ${port}`);
});
