'use strict';
var express = require('express'),
  logger = require('bragi'),
  middleware = require('./middleware'),
  bodyParser = require('body-parser'),
  routeloader = require('express-routeloader'),
  app = express();

// app.use(session({secret: 'alskjdflakjd'}));
app.use(function (req, res, next) {
  logger.log('http:' + req.url, 'Incomming request');
  return next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//index
app.get('/', function (req, res) {
  res.send('Sentia Hoarder Service');
});
// middleware
app.use(middleware.auth)
;
// load api routes
app.use(routeloader());
// error handling
app.use(require('./services/errorHandler'));

// Exports the app so it can be run programtically
// calling node main.js runs this server
module.exports = app;
