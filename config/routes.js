var home = require('../app/controllers/home');
var user = require('../app/controllers/user');
var mypatients = require('../app/controllers/mypatients');
var auth = require('./auth');
var logger = require('./logger');

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
		logger.log(req); // Print the request to the audit log

		if (auth.checkAPI(req)) {
			next();
		} else {
			res.status(403).end('Access denied.');
		}
	});

	app.route('/lang').get(function(req,res) {
		res.sendfile('language/swedish.json')
	});

	app.route('/angular').get(function (req, res) {
		res.sendfile('angular/app/ng-index.html');
	})

	// used to pass user data to angular app
	app.route('/currentuser').get(function(req, res) {
		if (req.isAuthenticated()) {
			return res.json(req.user);
		} else {
			res.send(403);
		}
	})

	
	/******* CORE PAGES ********/
	app.route('/logout').get(user.logout);
	app.route('/signup').get(user.signup);
	app.route('/profile').get(user.view);
	app.route('/mypatients/:p_id').get(user.doctorpatientprofile);
	app.route('/myprofile').get(user.myprofile).post(user.editprofile);  
 	app.route('/password').get(user.password).post(user.changepassword);    
	app.route('/').get(home.list);
	app.route('/mypatients/:p_id/formrunner').get(home.form);
	app.route('/mypatients/:p_id/addsurgery').get(home.surgery);
	app.route('/form').get(home.form);
	app.route('/mypatients').get(mypatients.list);

	/******* API CALLS **********/
	app.route('/api/patients')
 		.get(patient_api.list)
 		.post(patient_api.create)

	app.route('/api/patients/:id')
		.get(patient_api.view)
		.put(patient_api.update);

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

	app.post('/login2', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) {
				return res.status('401').send('Wrong password or username');
			}
			else {
				req.login(user, function() {
					res.cookie('user', JSON.stringify({'id': user.id}), { httpOnly: false } );
					return res.json(user);	
				});
			}
		})(req, res, next);
	});

	app.post('/logout2', function(req, res, next) {
		req.logout();
		res.clearCookie('user');
		return res.send('200');
	})



	// 404-page
	// app.route('/*')
	// .get(home.nothere);
};
