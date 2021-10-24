// 3rd party packages
let express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser');

// db setup
let mongoose = require('mongoose');
let DB = require('./db');

// auth
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// point mongoose to db URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB.');
})

// define the path for routing
let path = require('path');
let indexRouter = require('../app/routes/index');
let userRouter = require('../app/routes/user');
let businessContactRouter = require('../app/routes/businessContact');
//const app = require('../server');

module.exports = function() {
  let app = express();

  if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
  }
  else if (process.env.NODE_ENV === 'production') {
      app.use(compress());
  }
  
  app.use(express.json());
  app.use(express.urlencoded({
      extended: false
  }));

  // view engine setup
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'ejs');

  // express session
  app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
  }));

  // flash
  app.use(flash());

  // passport
  app.use(passport.initialize());
  app.use(passport.session());

  // passport user config

  // create user model instance
  let userModel = require('../app/models/user');
  let user = userModel.user;

  passport.use(user.createStrategy());

  // serialize & deserialize the user
  passport.serializeUser(user.serializeUser());
  passport.deserializeUser(user.deserializeUser());

  // routing
  app.use('/', indexRouter);
  app.use('/user', userRouter);
  app.use('/business-contact', businessContactRouter);

  // join path to shorten the referenced path
  app.use(express.static(path.join(__dirname, '../public'))); 
  app.use(express.static(path.join(__dirname, '../node_modules')));

  return app;
}