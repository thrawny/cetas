var home = require('../app/controllers/home');
var user = require('../app/controllers/user');
var mypatients = require('../app/controllers/mypatients');
var auth = require('./auth');

var patient_api = require('../app/controllers/api.patients');
var formrecord_api = require('../app/controllers/api.formrecord');
var surgery_api = require('../app/controllers/api.surgery'); 

module.exports = function(app, passport) {

	// Authorize user to a route. Check auth.js for logic.
	app.use(function(req, res, next) {
		if (auth.check(req)) {
			next();
		} else {
			res.status(403).end('Access denied. NOT API.');
		}
	});

	app.use('/api', function(req, res, next) {
		if (auth.checkAPI(req)) {
			next();
		} else {
			res.status(403).end('Access denied.');
		}
	});
	
	/******* CORE PAGES ********/
	app.route('/logout').get(user.logout);
	app.route('/signup').get(user.signup);
	app.route('/profile').get(user.view);
    app.route('/mypatients/:p_id').get(user.doctorpatientprofile);
	app.route('/surgeryinfo').get(user.surgeryinfo);
	app.route('/myprofile').get(user.myprofile).post(user.editprofile);  
 	app.route('/password').get(user.password).post(user.changepassword);    
	app.route('/').get(home.list);
	app.route('/mypatients/:p_id/formrunner').get(home.form);
	app.route('/form').get(home.form);
	app.route('/mypatients').get(mypatients.list);

	/******* API CALLS **********/
	app.route('/api/patients')
 		.get(patient_api.list)
 		.post(patient_api.create);

	app.route('/api/patients/:id')
		.get(patient_api.view);

	// Post new formrecord
	app.route('/api/patients/:p_id/formrecords')
		.post(formrecord_api.create);

	// View form record
	app.route('/api/patients/:p_id/formrecords/:f_id')
		.get(formrecord_api.view);

	// Post surgery
	app.route('/api/patients/:p_id/surgeries')
		.post(surgery_api.create)


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if
										// there is an error
		failureFlash : true
	// allow flash messages
	}));

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		
		// TODO: display error message if incorrect credentials
		failureRedirect : '/', // redirect back to the signup page if there
									// is an error
		failureFlash : true
	// allow flash messages
	}));
	// 404-page
	// app.route('/*')
	// .get(home.nothere);
};
