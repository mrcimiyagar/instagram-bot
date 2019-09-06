var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sw = require('./sequel-wrapper');
let ipb = require('./InstaPyBot/instapybot');
var auth = require('./routes/auth');
var instaacc = require('./routes/instaacc');
var tags = require('./routes/tags');
var follow = require('./routes/follow');
var block = require('./routes/block');
var like = require('./routes/like');
var comment = require('./routes/comment');
var index = require('./routes/index');

async function prepareTools() {
  await sw.setup();
  await ipb.setup();
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

prepareTools().then(function () {});

app.use('/api/auth', auth);
app.use('/api/insta_acc', instaacc);
app.use('/api/tag', tags);
app.use('/api/follow', follow);
app.use('/api/block', block);
app.use('/api/like', like);
app.use('/api/comment', comment);
app.use('/api/index', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
