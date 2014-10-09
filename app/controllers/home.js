var mongoose = require('mongoose'), 
    FormRecord = mongoose.model('FormRecord'), 
    Enum = require('enum'), 
    Enums = require('../models/enums.js');

var User = require('../models/user');

module.exports.list = function(req, res, next) {
	res.render('index', {
		messages : req.flash('notLoggedIn')
	});
};

module.exports.form = function(req, res, next) {
	res.render('questions');
};

module.exports.create = function(req, res, next) {

  if (req.user === undefined) {
    res.redirect('/form');
  }

  var fields = ['pain', 'painkillers', 'nausea', 'dailyActivities', 'routine', 'satisfied', 'worstThing', 'assess'];
  fields.forEach(function(elem) {
    if (req.body[elem] === '' || req.body[elem] === undefined) {
      res.redirect('/form');
    }
  });

  var record = {
    pain : req.body.pain,
    painKillers : Enums.yesOrNo.get(req.body.painkillers).value,
    nausea : req.body.nausea,
    narcosis : req.body.narcosis,
    dailyActivities : req.body.dailyActivities,
    routine : req.body.routine,
    satisfied : req.body.satisfied,
    worstThing : Enums.worstThing.get(req.body.worstThing).value,
    assess : req.body.assess
  };

  User.findOne({ _id: req.user.id }, function(err, user) {
    if (err) next(err);
    user.formrecords.push(record);
    user.save(function(err) {
      if (err) next(err);
      res.redirect('/');
    });
  })

};
