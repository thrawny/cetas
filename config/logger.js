"use strict";

var winston = require('winston'); // Logging library

winston.add(winston.transports.File, { filename: 'audit.log' }); // Set target for writing log
winston.remove(winston.transports.Console); // Remove default behaviour of writing to console

module.exports.log = function(req) {
	// Get relevant user information
	var user = {
		id: req.user._id,
		lastname: req.user.lastname,
		firstname: req.user.firstname
	};
	
	// Compose object with all info we want to log
	var action = {
			method: req.method,
			url: req.url,
			user: user
	};
	
	winston.info(action); // Write the action to log 
}