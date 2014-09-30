'use strict';

// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

var config = require('../../config/config');
var mongoose = require('mongoose');
var User = require('../models/user');

var roles = require('../models/enums').roles;

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

module.exports.adminUser = function() {
  var adminUser = new User();
  adminUser.local.email = 'admin@hej.se';
  adminUser.local.password = adminUser.generateHash('password1');
  adminUser.role = roles.admin;
  return adminUser;
}

module.exports.adminUserPassword = 'password1';

module.exports.patientUser = function() {
  var patientUser = new User();
  patientUser.local.email = 'patient@hej.se';
  patientUser.local.password = patientUser.generateHash('password2');
  patientUser.role = roles.patient;
  return patientUser;
}

module.exports.patientUserPassword = 'password2';

module.exports.doctorUser = function() {
  var doctorUser = new User();
  doctorUser.local.email = 'patient@hej.se';
  doctorUser.local.password = doctorUser.generateHash('password2');
  doctorUser.role = roles.doctor;
  return doctorUser;
}

module.exports.doctorUserPassword = 'password3';