var mongoose = require('mongoose'), 
    FormRecord = mongoose.model('FormRecord'), 
    Enum = require('enum'), 
    Enums = require('../models/enums.js');

var User = require('../models/user');

module.exports.list = function(req, res, next) {
	res.render('index', {
		messages : req.flash('notLoggedIn'),
		title: "Cetas"
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
			assess : 50,
			title:  "Svara på formulär"
		};
	res.render('questions', record);
};
