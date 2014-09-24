
var home = require('../app/controllers/home');
var mypatients = require('../app/controllers/mypatients');

module.exports = function (app) {

  app.route('/')
    .get(home.list)
    .post(home.create);

  app.route('/article/:articleId')
    .get(home.view);

  app.route('/delete/:articleId')
    .get(home.destroy);
    
  app.route('/mypatients')
    .get(mypatients.list);
};