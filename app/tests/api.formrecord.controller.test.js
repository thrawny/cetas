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

describe('POST and GET of /api/patients/:p_id/formrecords', function() {

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

  before(function(done) {
    async.series([clearDB, userSave, drSave] , 
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
      .post('/api/patients/'+patient_id+'/formrecords')
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
      .post('/api/patients/'+patient_id+'/formrecords')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(JSON.parse(res.text).error);
        return done();
      });

  });

  it('doctor should be able to view formrecord', function(done) {
    agent
      .post('/login')
      .send({email: utils.doctorUser().local.email, password: utils.doctorUserPassword})
      .expect(302)
      .expect('Location', '/')
      .end(function(err, res) {
        agent
          .get('/api/patients')
          .end(function(err, res) {
            var patients = JSON.parse(res.text);
            patients.length.should.equal(1);
            patients[0].formrecords.length.should.equal(1);

            var p_id = patients[0]._id;
            var f_id = patients[0].formrecords[0]._id;
            agent.get('/api/patients/'+p_id+'/formrecords/'+f_id)
              .expect(200)
              .expect('Content-Type', /json/, done)
          })
      })      
  });

});