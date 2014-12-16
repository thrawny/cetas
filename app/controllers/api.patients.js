var mongoose = require('mongoose');
var User = mongoose.model('User');
var roles = require('../models/enums').roles;
var _ = require('lodash');
// Lists all patients
// GET /api/patients
module.exports.list = function(req, res, next){
    var query = User.find({role: 0}, 'local.email firstname lastname formrecords personal_number');
    query.sort( { date: 1 } );
    query.exec(function(err, users) {
      if (err) next(err);
      res.json(users);
    });
}

// POST /api/patients/
module.exports.create = function(req, res, next) {

  if (req.body.email === '' || req.body.password === '') {
    req.flash('error', 'Fill in all the fields.');
    //TODO: return json
    //return res.redirect('/signup');
  }

  User.findOne({
          'local.email': req.body.email
        }, function(err, user) {
          // if there are any errors, return the error
          if (err)
            next (err);

          // check to see if theres already a user with that email
          if (user) {
            req.flash('error', 'That email is already taken.');
            //TODO: return json
            //return res.redirect('/signup');
          } 
          else {
            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = req.body.email;
            newUser.local.password = newUser.generateHash(req.body.password);
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.notes = req.body.notes;
            newUser.personal_number = req.body.personal_number;
            if (req.user.role == 1)
                newUser.role = roles.patient;
            if (req.user.role == 2)
                newUser.role = req.body.role;

            // save the user
            newUser.save(function(err) {
              if (err) throw err;
            //  req.flash('success', 'Patient saved.')
             // return res.redirect('/');
              return res.json({success: "Patient saved"});
            });
          }
  });
}

//Shows a specific patient
// GET /api/patients/p_id
module.exports.view = function(req, res, next) {
    User.findOne({_id: req.params.id, role: roles.patient}, function(err, user) {
      if (err) return next(err);
      if(user) {
        res.json(user);  
      } else {
        res.send(404);
      }
      
    })    
};

// PUT /api/patients/p_id
module.exports.update = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);
    if(req.body._id) { delete req.body._id; }

    var updated = _.merge(user, req.body)
    updated.save(function(err) {
      if (err) return next(err);
      return res.json(200, user);
    })
  });
}
