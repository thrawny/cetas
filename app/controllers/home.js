var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    FormRecord = mongoose.model('FormRecord'),
    Enum = require('enum'),
    Enums = require('../models/enums.js');


module.exports.list = function (req, res, next) {
  Article.find().exec(function (err, articles) {
    if (err) next(err);
    res.render('index', { articles: articles });
  });
};


module.exports.view = function (req, res, next) {
  Article.findOne({ _id: req.params.articleId } ).exec(function (err, article) {
    if (err) next(err);
    res.render('article', { article: article });
  });
};

module.exports.create = function (req, res, next) {
	FormRecord.create([{ 
		patientId: Enums.pain.get('1').value, 
		pain: Enums.pain.get(req.body.pain).value,
		painKillers: Enums.pain.get('1').value,
		nausea: Enums.pain.get('1').value,
		narcosis: Enums.pain.get('1').value}],
		
	                   function(err) {
    if (err) next(err);
    res.redirect('/');  
  });
};

module.exports.destroy = function (req, res, next) {
  Article.remove({ _id: req.params.articleId }, function (err) {
    res.redirect('/');
  })
};