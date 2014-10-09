var mongoose = require('mongoose');
var User = mongoose.model('User');

// Lists all patients
module.exports.list = function(req, res, next) {
    User.find({role: 0}, 'local.email firstname lastname formrecords', function(err, users) {
      if (err) next(err);
      res.json(users);
    });
};

// Shows a specific patient
// module.exports.view = function(req, res, next) {
//     User.find({id: })    
// };
