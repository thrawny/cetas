var mongoose = require('mongoose');
var User = mongoose.model('User');

// Lists all patients
module.exports.list = function(req, res, next) {
    User.find({role: 1}, 'local.email firstname lastname', function(err, users) { 	
      if (err) next(err);
      res.json(users);
    });
};

// Shows a specific patient
// module.exports.view = function(req, res, next) {
//     User.find({id: })    
// };
