var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var fs = require('fs'); // Used for reading language file

var passport = require('passport');
var flash    = require('connect-flash');
//var session  = require('express-session');
 
var init = function(app, config, session) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  // required for passport
 // app.use(session({ secret: 'itsfridayfriday' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  // exposing the user and language object to all jade templates
  app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.language = readLanguageFile();;
    next();
  });
  
  require('./routes')(app, passport);
  require('./passport')(passport); // pass passport for configuration

  // Use config/router.js to handle routes, use callback from controller

  // var controllers = glob.sync(config.root + '/app/controllers/*.js');
  // controllers.forEach(function (controller) {
  //   require(controller)(app);
  // });

  if(app.get('env') === 'development') {
    app.locals.pretty = true;
    app.use(express.static(config.root + '/angular'));
    app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
    });
    
    app.use(errorHandler());
  }
};

// Reads the language file and returns JSON objects with all the strings used by the system.
// TODO: dynamically find the current language file
var readLanguageFile = function() {
	var file = './language/swedish.json';
	var data = fs.readFileSync(file, 'utf8'); 
	return JSON.parse(data);
};

// Making these functions globally visible
module.exports = {
		init: init
}