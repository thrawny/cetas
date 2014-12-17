var config = require('./config/config');
var mongoose = require('mongoose');
var glob = require('glob');

mongoose.connect(config.db, config.options);
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var User = mongoose.model('User');

var drUser = new User();

User.findOne({'local.email': 'dr@esana.se'}, function(err, user) {
  if (err) {
    console.log(err)
    process.exit(1);
  }
  else if (user) {
    console.log("User already exists");
    process.exit();
  }
  else {
    drUser.local.email = 'dr@esana.se';
    drUser.local.password = drUser.generateHash('password123');
    drUser.role = 1;
    drUser.firstname = 'Doktor';
    drUser.lastname = 'Doktorsson';

    drUser.save(function(err) {
      if (err) {
        console.log(err);  
        process.exit(1);  
      }
      else {
        console.log("Success");
        process.exit();
      }
    });    
  }
});

