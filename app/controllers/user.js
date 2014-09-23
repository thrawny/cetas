var mongoose = require('mongoose'),
  User = mongoose.model('User');


module.exports.login = function(req, res) {
  res.render('user/login');

}

module.exports.view = function(req, res) {
  res.render('user/profile', {user: req.user});
}

module.exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports.signup = function(req, res) {
  res.render('user/signup');
}