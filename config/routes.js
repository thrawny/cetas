var home = require('../app/controllers/home');
var user = require('../app/controllers/user');
var mypatients = require('../app/controllers/mypatients');
var auth = require('./auth');

module.exports = function (app, passport) {


  // Authorize user to a route. Check auth.js for logic.
  app.use(function(req, res, next) {
    if (auth.check(req)) {
      next();  
    }
    else {
      res.status(403).end('Access denied. NOT API.');
    }
  });

  app.use('/api', function (req, res, next) {
    if(auth.checkAPI(req)) {
      next();
    }
    else {
      res.status(403).end('Access denied.');
    }
  });

	app.route('/')
    .get(home.list)
    .post(home.create);

	app.route('/form')
    .get(home.form)
    .post(home.create);

  app.route('/article/:articleId')
    .get(home.view);

  app.route('/delete/:articleId')
    .get(home.destroy);

  app.route('/mypatients')
    .get(mypatients.list);

  // User routes
  app.route('/login')
    .get(user.login)

  app.route('/logout')
    .get(user.logout);

  app.route('/signup')
    .get(user.signup);

  // Dummy api routes. Replace these with the real stuff. The '/api' middleware will handle authorization. Check line 18 in this file.
  app.route('/api/patients/:id')
    .get(function(req, res) {
      var data = { patient: 'name'+req.params.id }
      res.json(data)
    });

  app.route('/api/patients')
    .get(function(req, res) {
      var data = {
        patients: ['patient1', 'patient2', 'patient3']
      };
      res.json(data)
    });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

};

