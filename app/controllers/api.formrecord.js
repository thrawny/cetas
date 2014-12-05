//TODO: Define outgoing email adress. Who you gonna mail? (Not ghostbusters)
var mongoose = require('mongoose'), 
    FormRecord = mongoose.model('FormRecord'), 
    Enum = require('enum'), 
    Enums = require('../models/enums.js');
    User = mongoose.model('User');
    roles = require('../models/enums').roles,
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cetasdevelop@gmail.com',
            pass: 'CENSURED'
        }
    });
    //For password; Ask the almighty Mike
    
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
    assess : req.body.assess,
    comments : req.body.comments
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
        if(req.query.format === 'json') {
          return res.json({ result: 'record added' });
        }
        //Insert email down here.
        if (req.user.role == roles.patient) {
        	//Update subject and text. There is a html-field for html-mails
        	//Use html: 'htmlhere'
        	//See http://www.nodemailer.com/#address-formatting
        	transporter.sendMail({
        	    from: 'Cetas <cetasdevelop@gmail.com>',
        	    to: '',
        	    subject: 'Nytt formulär ifyllt',
        	    text: 'Nu har någon fyll i ett formulär... Igen.'
        	});

        }
        return res.json({result: "Record added."})      
    });
  })

};

module.exports.view = function(req, res, next) {
  User.findOne({ _id: req.params.p_id },  function(err, user) {
    res.json(user.formrecords.id(req.params.f_id));
  })
}
