require('dotenv').config(); // allow acccess to env vars in app

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./util/logger');
const config = require('./util/config');

const watsonAuthRouter = require('./routes/auth.route');
const emailRouter = require('./routes/email.route');

const { port } = config;
const morganLogLevel = config.environment === 'production' ? 'combined' : 'dev';

const app = express();

// global middelware
app.use(cors());
app.use(morgan(morganLogLevel));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
