var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var cigarrosRouter = require('./routes/cigarros');
var usersRouter = require('./routes/users');
var labelsRouter = require('./routes/labels');
var errorRouter = require('./routes/error');
const fs = require('fs');
const uuid = require('uuid/v4')
const session =  require('express-session') ;
var cookieParser = require('cookie-parser')





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cigarros',cigarrosRouter);
app.use('/help',indexRouter);
app.use('/about', indexRouter);
app.use('/users', usersRouter);
app.use('/labels', labelsRouter);
app.use('/error',errorRouter);
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
app.use('/css', express.static(__dirname + '/node_modules/bulma/css')); 
app.engine('html', require('ejs').renderFile);
app.use(cookieParser())




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log('lasdoaskdsad')
  console.log(err.message)

  res.render('error',{ link: req.headers.referer, error:'res.locals.message', userId:'' })   
});

var server     =    app.listen(3000,function(){
  console.log("Express is running on port 3000");
  });
module.exports = app;
