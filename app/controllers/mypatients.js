var mongoose = require('mongoose'),
    User = mongoose.model('User');

// Lists all patients
module.exports.list = function(req, res, next) {
    res.render('mypatients', {title: "Mina patienter"});
};

// Shows a specific patient
module.exports.showPatient = function(req, res, next) {
	// TODO: implement
	// Get the id supplied with the URL using: req.params.id
    res.render('mypatients', {title: "Patientdata"});
};