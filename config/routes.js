var home = require('../app/controllers/home');
var user = require('../app/controllers/user');
var mypatients = require('../app/controllers/mypatients');
var auth = require('./auth');

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
	app.route('/myprofile').get(isLoggedIn, user.myprofile).post(isLoggedIn, user.editprofile);  
        app.route('/password').get(isLoggedIn, user.password);  
	app.route('/').get(home.list).post(home.create);

	
	app.route('/form').get(home.form).post(home.create);
	app.route('/article/:articleId').get(home.view);
	app.route('/delete/:articleId').get(home.destroy);

	
	/******* API CALLS **********/
	app.route('/api/patients').get(mypatients.list);
	app.route('/api/patients/:id').get(mypatients.showPatient);


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
