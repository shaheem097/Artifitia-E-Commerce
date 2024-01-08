var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser')
var logger = require('morgan');
var usersRouter = require('./routes/users');
const CORS=require('cors')


require('dotenv').config();

require('./config/dbconfig')

var app = express();


// view engine setupdd
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const allowedOrigins = [
  'http://localhost:5173',
  'https://artifitia-nd8tepsb1-shaheems-projects-ce091292.vercel.app',
  'https://artifitia.onrender.com',
];

app.use(
  CORS({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use('/files', express.static('uploads'));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

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
  res.render('error');
});

module.exports = app;
