var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
    http.post = require('http-post');
var qs = require('querystring');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.post('/login', function(request, response) {
  // The URL to post to
  var host = 'localhost';
  var port = 4567;
  var path = '/checkLogin'

  // Build the post string from an object
  var post_data = {
    'username':request.body.username,
    'password':request.body.password
  };

  var url = 'http://'+host+':'+port+path;

  var post_req = http.post(url, post_data, function(res){
    res.on('data', function(chunk) {
      var status = JSON.parse(chunk.toString());
      if(status == "success") {
        response.send(status, 200);
      } else {
        response.send(status, 401);
      }
      response.end();
    });
  });
});

app.get('/checkLogin', function(request, response) {
  // The URL to post to
  var host = 'localhost';
  var port = 4567;
  var path = '/checkLogin'
  var query = qs.stringify({username: "jeremy", password: 'jeremy'});

  var url = 'http://'+host+':'+port+path+'?'+query;
  var req = http.get(url, function(res) {
    // save the data
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      response.write(data);
      response.end();
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
