var mongoose = require('mongoose');
var User = mongoose.model('User');
var roles = require('../models/enums').roles;
var _ = require('lodash');
// Lists all patients
module.exports.list = function(req, res, next){
    var query = User.find({role: 0}, 'local.email firstname lastname formrecords');
    query.sort( { date: 1 } );
    query.exec(function(err, users) {
      if (err) next(err);
      res.json(users);
    });
}

module.exports.create = function(req, res, next) {

  if (req.body.email === '' || req.body.password === '') {
    req.flash('error', 'Fill in all the fields.');
    return res.redirect('/signup');
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
            return res.redirect('/signup');
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
            newUser.personal_number = req.body.personal_number;
            if (req.user.role == 1)
                newUser.role = roles.patient;
            if (req.user.role == 2)
                newUser.role = req.body.role;

            // save the user
            newUser.save(function(err) {
              if (err) throw err;
              req.flash('success', 'Patient saved.')
              return res.redirect('/');
            });
          }
  });
}

//Shows a specific patient
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
