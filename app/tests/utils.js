'use strict';


// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

var config = require('../../config/config');
var mongoose = require('mongoose');

module.exports.clearDB = function (done) {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
  return done();
}

module.exports.connectDB = function(done) {
  if (mongoose.connection.db) return done();
  mongoose.connect(config.db, done);
}

module.exports.disconnectdB = function(done) {
  mongoose.disconnect();
  return done();
}