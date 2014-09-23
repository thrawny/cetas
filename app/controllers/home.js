<<<<<<< HEAD
var express = require('express'), router = express.Router(), mongoose = require('mongoose'), Article = mongoose
		.model('Article'), Enum = require('enum');
=======
var mongoose = require('mongoose'),
    Article = mongoose.model('Article');
>>>>>>> branch 'master' of https://github.com/thrawny/cetas.git

<<<<<<< HEAD
var myEnum = new Enum({
	'A' : '1',
	'B' : '2',
	'C' : 4
});
=======
>>>>>>> branch 'master' of https://github.com/thrawny/cetas.git

<<<<<<< HEAD
module.exports = function(app) {
	app.use('/', router);

	app.route('/').get(function(req, res, text) {
		Article.find().exec(function(err, articles) {
			if (err)
				next(err);
			res.render('index', {
				articles : articles
			});
		});
	}).post(function(req, res, next) {
		console.log(myEnum.get('A').value);
		console.log('postdata');
		Article.create([{ title: myEnum.get('A').value, text: myEnum.get('B').value}], function(err) {
			if (err)
				next(err);
			res.redirect('/');
		});
	});

	app.route('/article/:articleId').get(function(req, res, next) {
		Article.findOne({
			_id : req.params.articleId
		}).exec(function(err, article) {
			if (err)
				next(err);
			res.render('article', {
				article : article
			});
		});
	});

	app.route('/delete/:articleId').get(function(req, res, next) {
		Article.remove({
			_id : req.params.articleId
		}, function(err) {
			res.redirect('/');
		})
	});
=======
module.exports.list = function (req, res, next) {
  Article.find().exec(function (err, articles) {
    if (err) next(err);
    res.render('index', { articles: articles });
  });
>>>>>>> branch 'master' of https://github.com/thrawny/cetas.git
};

<<<<<<< HEAD
router.use(function(req, res, next) {
	console.log(req.method);
	next();
});
=======

module.exports.view = function (req, res, next) {
  Article.findOne({ _id: req.params.articleId } ).exec(function (err, article) {
    if (err) next(err);
    res.render('article', { article: article });
  });
};

module.exports.create = function (req, res, next) {
  Article.create(req.body, function(err) {
    if (err) next(err);
    res.redirect('/');  
  });
};

module.exports.destroy = function (req, res, next) {
  Article.remove({ _id: req.params.articleId }, function (err) {
    res.redirect('/');
  })
};
>>>>>>> branch 'master' of https://github.com/thrawny/cetas.git
