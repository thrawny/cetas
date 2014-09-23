
var home = require('../app/controllers/home');

module.exports = function (app) {

  app.route('/')
    .get(home.list)
    .post(home.create);

  app.route('/article/:articleId')
    .get(home.view);

  app.route('/delete/:articleId')
    .get(home.destroy);
};