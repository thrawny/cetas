var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    FormRecord = mongoose.model('FormRecord'),
    Enum = require('enum'),
    Enums = require('../models/enums.js');


module.exports.list = function (req, res, next) {
  Article.find().exec(function (err, articles) {
    if (err) next(err);
    res.render('index', { articles: articles, messages: req.flash('notLoggedIn') });
  });
};


module.exports.view = function (req, res, next) {
  Article.findOne({ _id: req.params.articleId } ).exec(function (err, article) {
    if (err) next(err);
    res.render('article', { article: article });
  });
};

module.exports.form = function (req, res, next) {
	    res.render('questions');
	};

module.exports.create = function (req, res, next) {
	FormRecord.create([{ 
		patientId: Enums.yesOrNo.get('yes').value, 
		pain: req.body.pain,
		painKillers: Enums.yesOrNo.get(req.body.painkillers).value ,
		nausea: req.body.nausea,
		narcosis: req.body.narcosis,
		dailyActivities: req.body.dailyActivities,
		routine: req.body.routine,
		satisfied: req.body.satisfied,
		worstThing: Enums.worstThing.get(req.body.worstThing).value,
		assess: req.body.assess
	}],
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
