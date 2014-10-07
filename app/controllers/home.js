var mongoose = require('mongoose'), FormRecord = mongoose.model('FormRecord'), Enum = require('enum'), Enums = require('../models/enums.js');

var User = require('../models/user');
var painkillers;
var worstThing;
var pageError = false;

module.exports.list = function(req, res, next) {
	res.render('index', {
		messages : req.flash('notLoggedIn')
	});
};

module.exports.form = function(req, res, next) {
	var record = {
			pain : 50,
			painKillers : "",
			nausea : 50,
			narcosis : 50,
			dailyActivities : 50,
			routine : 50,
			satisfied : 50,
			worstThing : "",
			assess : 50
		};
	res.render('questions', record);
};

module.exports.create = function(req, res, next) {

	if (req.user === undefined) {
		res.redirect('/form');
	}

	var fields = [ 'pain', 'nausea', 'dailyActivities', 'routine', 'satisfied',
			'assess' ];

	// fields.forEach(function(elem) {
	for (var int = 0; int < fields.length; int++) {
		if (req.body[fields[int]] === '' || req.body[fields[int]] === undefined
				|| req.body[fields[int]] < 0 || req.body[fields[int]] > 100) {
			console.log("kommer hit1");
			pageError = true; // Throw some error
			// Checks if someone is trying to input other values then 0>=x<=100
		}
	}

	// if painkillers is unanswered
	if (req.body.painkillers === '' || req.body.painkillers === undefined) {
		painkillers = "0";
		pageError = true;
		console.log("kommer hit2");
		console.log(req.body.painkillers);
	} else {
		painkillers = Enums.yesOrNo.get(req.body.painkillers).value;
	}

	if (req.body.worstThing === '' || req.body.worstThing === undefined) {
		// if worstThing is unanswered
		worstThing = "0";
		pageError = true;
		console.log("kommer hit3");
	} else {
		worstThing = Enums.worstThing.get(req.body.worstThing).value;
	}

	var record = {
		pain : req.body.pain,
		painKillers : painkillers,
		nausea : req.body.nausea,
		narcosis : req.body.narcosis,
		dailyActivities : req.body.dailyActivities,
		routine : req.body.routine,
		satisfied : req.body.satisfied,
		worstThing : worstThing,
		assess : req.body.assess,
	};
	if (pageError === true) {
		record["pageError"] = true;
		return res.render('questions', record);
	}

	User.findOne({
		_id : req.user.id
	}, function(err, user) {
		if (err)
			next(err);
		user.formrecords.push(record);
		user.save(function(err) {
			if (err)
				next(err);
			res.redirect('/');
		});
	})

};
