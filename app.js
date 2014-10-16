var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongostore')(session);

mongoose.connect(config.db, config.options);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

var express = require('./config/express')

if (process.env.NODE_ENV === 'development') {
  store = new MongoStore({'db': 'sessions'}, function(err) {
    app.use(session({
      secret: 'itsfridayfriday',
      store: store,
      saveUninitialized: true,
      resave: true
    }));
    express.init(app, config, session);
    app.listen(config.port);
    console.log('The magic happens on port ' + config.port);
  })
}
else if (process.env.NODE_ENV === 'test') {
  app.use(session({
      secret: 'itsfridayfriday',
      saveUninitialized: true,
      resave: true
    }));
  express.init(app, config, session);
  app.listen(config.port);
  module.exports = app;
}

  

