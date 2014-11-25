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

  // This fails for now.
  // it('should not be able to access /api', function(done) {
  //   agent
  //     .get('/api/patients')
  //     .expect(403, done);
  // });

  after(function(done) {
    agent
      .get('/logout')
      .expect(302, done)
  });
})

describe('GET /api/patients by doctor.', function() {
  var agent = request.agent(app);

  var testUser = {
      email: 'test@test.se',
      password: 'password123',
      firstname: 'Palle',
      lastname: 'Kuling'
  };

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

  it('should respond with json when requesting a list of users', function(done) {
    agent
      .get('/api/patients')
      .expect(200)
      .expect('Content-Type', /json/, done)
  });

  it('should be able to create new patient', function(done) {
    agent
      .post('/api/patients')
      .send(testUser)
      .expect(200)
      .expect('Content-Type', /json/, done) 
  });

  it('should respond with json when requesting a single user', function(done) {
    User.findOne({'local.email': testUser.email}, function(err, user){
      if (err) return done(err);
      agent
        .get('/api/patients/'+user._id)
        .expect(200)
        .expect('Content-Type', /json/, done)  
    })
  });
})