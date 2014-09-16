var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);

  app.route('/')
    .get(function (req, res, text){
      Article.find().exec(function (err, articles) {
        if (err) next(err);
        res.render('index', { articles: articles });
      });
    })
    .post(function (req, res, next) {
      Article.create(req.body, function(err) {
        if (err) next(err);
        res.redirect('/');  
      });
    });

  app.route('/article/:articleId')
    .get(function (req, res, next) {
      res.send(req.params.articleId);
  });

  app.route('/delete/:articleId')
    .get(function (req, res, next) {
      Article.remove({ _id: req.params.articleId }, function (err) {
        res.redirect('/');
      })
    });

};

router.use(function(req, res, next){
  console.log(req.method);
  next();
});
