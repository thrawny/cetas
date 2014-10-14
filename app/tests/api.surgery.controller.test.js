'use strict';

// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest');
var app = require('../../app');
var async = require('async');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var utils = require('./utils');

describe('POST and GET of /api/patients/:p_id/surgeries', function() {

  var agent = request.agent(app);

  var patient_id;


  // trying out the async package
  var clearDB = function(cb) {
    utils.clearDB2();
    cb(null, 1);
  };

  var userSave = function(cb) {
    utils.patientUser().save(function(err, user) {
      patient_id = user._id;
      cb(null, 2);
    });
  }

  var drSave = function(cb) {
    utils.doctorUser().save(function(err) {
      cb(null, 3);
    });
  }

  var drLogin = function(cb) {
    agent
    .post('/login')
    .send({email: utils.patientUser().local.email, password: utils.patientUserPassword})
    .end(function(err, res) {
      cb(null, 4);
    })

  }

  before(function(done) {
    async.series([clearDB, userSave, drSave, drLogin] , 
      function(err, results) {
        if (err) return done(err);
        done();
      }
    );
  });

  it('should be able to post new surgery', function(done) {
    agent
      .post('/api/patients/'+patient_id+'/surgeries')
      .send(utils.exampleSurgery)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        should.exist(JSON.parse(res.text).success);
        return done();
      })
  });

});