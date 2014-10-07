var mongoose = require('mongoose'), FormRecord = mongoose.model('FormRecord'), Enum = require('enum'), Enums = require('../models/enums.js');

var User = require('../models/user');

module.exports.list = function(req, res, next) {
	res.render('index', {
		messages : req.flash('notLoggedIn')
	});
};

module.exports.form = function(req, res, next) {
	res.render('questions');
};
