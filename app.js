var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookiePaser = require('cookie-parser');
var bodyPaser = require('body-parser');
var http = require('http');
var debug = require('debug')('portfolio:app');
var server;

var app = express();

var port = process.env.PORT || '3000';

app.set('port', port);
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

//error handlers

//development error handler
//will print stacktrace
if(app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server = http.createServer(app);
server.listen(port);

module.exports = app;