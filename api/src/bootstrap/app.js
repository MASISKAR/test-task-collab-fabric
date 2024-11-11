const Promise = require('bluebird');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const errorHandler = require('./errorHandler');

const app = express();

app.isRunning = Promise.pending();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
}));

app.set('showStackError', true);
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_BASE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.enable('case sensitive routing');
app.enable('strict routing');

app.use('/api/form', require('../routes/formRoute'));

app.use((req, res, next) => {
  next(createError(404));
});

errorHandler(app);
module.exports = app;
