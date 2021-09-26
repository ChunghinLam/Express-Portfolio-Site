let express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser');
  
let path = require('path');
let indexRouter = require('./app/routes/index');

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
  app.set('views', path.join(__dirname, 'app/views'));
  app.set('view engine', 'ejs');

  app.use('/', indexRouter);

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'node_modules')));

  return app;
}