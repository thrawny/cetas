'use strict';

// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest');
var app = require('../../app');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var utils = require('./utils');

describe('GET /api/patients by patient', function() {
  var agent = request.agent(app);

  before(function(done){
    utils.clearDB(done);
  });

  before(function(done){
    utils.patientUser().save(done);
  });

  it('should be able to login', function(done) {
    agent
      .post('/login')
      .send({email: utils.patientUser().local.email, password: utils.patientUserPassword})
      .expect(302)
      .expect('Location', '/', done);
  });

  it('should not be able to access /api', function(done) {
    agent
      .get('/api/patients')
      .expect(403, done);
  });

  after(function(done) {
    agent
      .get('/logout')
      .expect(302, done)
  });
})

describe('GET /api/patients by doctor.', function() {
  var agent = request.agent(app);

  before(function(done){
    utils.clearDB(done);
  });

  before(function(done){
    utils.doctorUser().save(done);
  });

  it('should be able to login', function(done) {
    agent
      .post('/login')
      .send({email: utils.doctorUser().local.email, password: utils.doctorUserPassword})
      .expect(302)
      .expect('Location', '/', done);
  });

  it('should respond with json', function(done) {
    agent
      .get('/api/patients')
      .expect(200)
      .expect('Content-Type', /json/, done)
  });

  it('should respond with json', function(done) {
    agent
      .get('/api/patients/1')
      .expect(200)
      .expect('Content-Type', /json/, done)
  });
})