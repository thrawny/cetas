// TODO: fetch from database
var data = {
    "patients": [
        {"id": "910411-0573", "sex": "Man", "records": [{"id":"Form1", "1": "5.23", "2": "8.81"}, {"id": "Form2", "1": "4.32"}]},
        {"id": "910411-0574", "sex": "Kvinna", "records": [{"id":"Form1", "1": "3.33"}]},
        {"id": "910411-0575", "sex": "Kvinna", "records": []}
    ]
};

// Lists all patients
module.exports.list = function(req, res, next) {
    res.render('mypatients', {"patients": data.patients});
};

// Shows a specific patient
module.exports.showPatient = function(req, res, next) {
	// TODO: implement
	// Get the id supplied with the URL using: req.params.id
    res.render('mypatients', {"patients": data.patients});
};