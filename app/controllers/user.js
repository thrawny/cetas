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

module.exports.doctorpatientprofile = function(req, res) {
  res.render('user/doctorpatientprofile');
}


module.exports.myprofile = function(req, res, next) {
  res.render('user/myprofile');
}

module.exports.editprofile = function (req, res, next) {
  
 User.findById(req.body.id, function (err, ep) {
  if (err) return next(err);

   ep.firstname = req.body.firstname;
   ep.lastname = req.body.lastname;
   ep.personal_number = req.body.personal_number;
   ep.address1 = req.body.address1;
   ep.address2 = req.body.address2;
   ep.postalno = req.body.postalno;
   ep.city = req.body.city;
   ep.mobile = req.body.mobile;

    ep.save(function(err){
    if (err) next(err)
    else res.redirect('/myprofile')
   });
  
 });
};

module.exports.password = function(req, res, next) {
  res.render('user/password');
}

module.exports.changepassword = function (req, res, next) {
  
 User.findById(req.body.id, function (err, cp) {
  if (err) return next(err);
    if (req.body.password != req.body.confirmpassword) return next('Bekräftelse Lösenord är inte korrekt!');
    if (!cp.validPassword(req.body.password))
          return next('Lösenordet är fel!!');

     cp.local.password = cp.generateHash(req.body.password);

    cp.save(function(err){
    if (err) next(err)
    else 
      if (req.user.role >0) res.redirect('/')
      else res.redirect('/myprofile')
   });
  
 });
};
