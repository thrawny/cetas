var home = require('../app/controllers/home');
var user = require('../app/controllers/user');

module.exports = function (app, passport) {

	app.route('/').get(home.list).post(home.create);
	app.route('/form').get(home.form).post(home.create);

  app.route('/article/:articleId')
    .get(home.view);

  app.route('/delete/:articleId')
    .get(home.destroy);


  // User routes
  app.route('/login')
    .get(user.login)

  app.route('/logout')
    .get(user.logout);

  app.route('/profile')
    .get(isLoggedIn, user.view);

  app.route('/signup')
    .get(user.signup);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
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

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  req.flash('notLoggedIn', 'Du är inte inloggad.');
  res.redirect('/');
}