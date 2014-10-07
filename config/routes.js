var home = require('../app/controllers/home');
var user = require('../app/controllers/user');
var mypatients = require('../app/controllers/mypatients');
var auth = require('./auth');

var patient_api = require('../app/controllers/api.patients');
var formrecord_api = require('../app/controllers/api.formrecord'); 

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
	app.route('/login').get(user.login)
	app.route('/logout').get(user.logout);
	app.route('/signup').get(user.signup);
	app.route('/profile').get(user.view);
	app.route('/myprofile').get(user.myprofile).post(user.editprofile);  
  app.route('/password').get(user.password).post(user.changepassword);    
	app.route('/').get(home.list);

	
	app.route('/form').get(home.form);


	
	/******* API CALLS **********/
	app.route('/api/patients')
 		.get(patient_api.list)
 		.post(patient_api.create);

	app.route('/api/patients/:id')
		.get(patient_api.view);

	app.route('/api/formrecord')
		.post(formrecord_api.create);


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
		failureRedirect : '/login', // redirect back to the signup page if there
									// is an error
		failureFlash : true
	// allow flash messages
	}));

};
