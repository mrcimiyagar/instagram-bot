let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let sw = require('./sequel-wrapper');
let ipb = require('./InstaPyBot/instapybot');
let auth = require('./routes/auth');
let instaacc = require('./routes/instaacc');
let tags = require('./routes/tags');
let follow = require('./routes/follow');
let block = require('./routes/block');
let like = require('./routes/like');
let comment = require('./routes/comment');
let config = require('./routes/config');
let index = require('./routes/index');

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
app.use('/api/config', config.router);
app.use('/api/index', index);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
});

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
