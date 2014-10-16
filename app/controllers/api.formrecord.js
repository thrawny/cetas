var mongoose = require('mongoose'), 
    FormRecord = mongoose.model('FormRecord'), 
    Enum = require('enum'), 
    Enums = require('../models/enums.js');
    User = mongoose.model('User');


// Handle post request with new form record.
module.exports.create = function(req, res, next) {

  var pageError = false;
  var painkillers;
  var worstThing;

  // if (req.user === undefined) {
  //   res.redirect('/form');
  // }

  var fields = [ 'pain', 'nausea', 'dailyActivities', 'routine', 'satisfied',
      'assess' ];

  // fields.forEach(function(elem) {
  for (var int = 0; int < fields.length; int++) {
    if (req.body[fields[int]] === '' || req.body[fields[int]] === undefined
        || req.body[fields[int]] < 0 || req.body[fields[int]] > 100) {
      pageError = true; // Throw some error
      // Checks if someone is trying to input other values then 0>=x<=100
    }
  }

  // if painkillers is unanswered
  if (req.body.painkillers === '' || req.body.painkillers === undefined) {
    painkillers = "0";
    pageError = true;
  } else {
    painkillers = Enums.yesOrNo.get(req.body.painkillers).value;
  }

  if (req.body.worstThing === '' || req.body.worstThing === undefined) {
    // if worstThing is unanswered
    worstThing = "0";
    pageError = true;
  } else {
    worstThing = Enums.worstThing.get(req.body.worstThing).value;
  }

  var record = new FormRecord ({
    pain : req.body.pain,
    painKillers : painkillers,
    nausea : req.body.nausea,
    narcosis : req.body.narcosis,
    dailyActivities : req.body.dailyActivities,
    routine : req.body.routine,
    satisfied : req.body.satisfied,
    worstThing : worstThing,
    assess : req.body.assess
  });
  if (pageError) {
    record["pageError"] = true;
    //return res.render('questions', record);
    return res.json({error: "Incorrect post data"});
  }

  User.findOne({
    _id : req.params.p_id
  }, function(err, user) {
    if (err)
      next(err);
      user.formrecords.push(record);
      user.save(function(err) {
      if (err)
        next(err);
      //return res.json({success: "User was saved successfully"});
      return res.json(record);
    });
  })

};


module.exports.view = function(req, res, next) {
  User.findOne({ _id: req.params.p_id },  function(err, user) {
    res.json(user.formrecords.id(req.params.f_id));
  })
}
