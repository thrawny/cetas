var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Surgery = mongoose.model('Surgery');

// Handle post request with new surgery data.
// POST /api/patients/p_id/surgeries
module.exports.create = function (req, res, next) {
  User.findOne({_id: req.body.patient_id}, function(err, user) {
    if (err) next(err);
    var sur = new Surgery({
      operation: req.body.operation,
      department: req.body.department,
      hospital: req.body.hospital,
      comments: req.body.comments
    });
    console.log(sur);
    user.surgeries.push(sur);
    user.save(function(err) {
      return res.json({success: "Operation saved"});
    });

  });
};

module.exports.view = function(req, res, next) {

};