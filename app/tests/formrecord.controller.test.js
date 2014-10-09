'use strict';

// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest');
var app = require('../../app');
var async = require('async');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var FormRecord = mongoose.model('FormRecord');

var utils = require('./utils');

describe('POST and GET of /form', function() {

  var agent = request.agent(app);

  // trying out the async package
  var clearDB = function(cb) {
    utils.clearDB2();
    cb(null, 1);
  };

  var userSave = function(cb) {
    utils.patientUser().save(function(err) {
      cb(null, 2);
    });
  }

  before(function(done) {
    async.series([clearDB, userSave] , 
      function(err, results) {
        if (err) return done(err);
        done();
      }
    );
  });

  it('should be able to login', function(done) {
    agent
      .post('/login')
      .send({email: utils.patientUser().local.email, password: utils.patientUserPassword})
      .expect(302)
      .expect('Location', '/', done);
  });

  it('should be able to view form', function(done) {
    agent
      .get('/form')
      .expect(200, done)
  });

  it('should create formrecord object in db with correct data', function(done) {
    agent
      .post('/api/formrecord')
      .send(utils.exampleFormRecord)
      .end(function(err, res) {
        if (err) return done(err);
        User.findOne({'local.email': utils.patientUser().local.email}, function(err, user) {
          if (err) return done(err);
          user.formrecords.length.should.equal(1);
          done();
        });
      });
  });

  it('post should redirect to /form with incorrect data', function(done) {
    agent
      .post('/api/formrecord')
      .expect(302)
      .expect('Location', '/form', done);
  });

});