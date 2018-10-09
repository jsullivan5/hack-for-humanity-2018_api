require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const watsonAuthRouter = require('./routes/auth.route');
const emailRouter = require('./routes/email.route');

const app = express();

// global middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routing
app.use('/auth', watsonAuthRouter);
app.use('/email', emailRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.listen(5000, () => {
  console.info(`iGen server is listening on port ${5000}`);
});
