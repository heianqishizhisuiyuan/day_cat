var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var session=require('express-session');



/*var MongoDBStore=require('connect-mongodb-session')(session);
var store=new MongoDBStore({
  uri:'mongodb://localhost:27017/study',
  collection:'sessions_test'
}); */




var mongoose=require('mongoose');
mongoose.Promise = global.Promise;//为了解决过期问题
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost:27017/test2');
//global.mongoose=mongoose;
mongoose.connection.on("error",function(error){
	console.log("connection error:"+error);
})
mongoose.connection.on("open",function(){
	console.log("connection success");
})

var connect = require('connect');
var SessionStore = require("session-mongoose")(connect);
var store = new SessionStore({
    url: "mongodb://localhost:27017/session",
    interval: 120000 // expiration check worker run interval in millisec (default: 60000)
});



var routes = require('./routes/index');
var users  = require('./routes/users');
var admin  = require('./routes/admin');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
	store: store,
	secret: 'keyboard cat',  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: true,
	saveUninitialized: true,
}))

app.use('/', routes);
app.use('/users', users);
app.use('/admin',admin);

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
