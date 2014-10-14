var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Surgery = mongoose.model('Surgery');

// Handle post request with new surgery data.
module.exports.create = function (req, res, next) {
  User.findOne({_id: req.params.p_id}, function(err, user) {
    if (err) next(err);
    var sur = new Surgery({
      operation: req.body.operation,
      department: req.body.department,
      hospital: req.body.hospital,
      comments: req.body.comments
    });
    user.surgeries.push(sur);
    user.save(function(err) {
      return res.json({success: "Surgery saved"});
    });

  });
};

module.exports.view = function(req, res, next) {

};