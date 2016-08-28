var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookiePaser = require('cookie-parser');
var bodyPaser = require('body-parser');
var http = require('http');
var debug = require('debug')('portfolio:app');
var config = require('./config');
var errors = require('./util/errors');
var server;

var app = express();
var projectEnv = process.env.PROJECT_ENV || 'development';
app.set('env', projectEnv);
config = projectEnv == 'development'?config.development:config.production;
debug(config);

app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));
app.use(cookiePaser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
errors.handleError(app);
server = http.createServer(app);
server.listen(app.get('port'));

module.exports = app;