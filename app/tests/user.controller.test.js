'use strict';

// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest')
var app = require('../../app');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var utils = require('./utils');

describe('GET /login', function(){
  it('should respond with 200', function(done){
    request(app)
      .get('/login')
      .expect(200, done);
  });
})

describe('GET /form', function(){
  it('should redirect to home if not logged in', function(done){
    request(app)
      .get('/form')
      .expect('location', '/', done);
  });
})


describe('POST /login', function(){

  var email = 'hej@hej.se';
  var password = 'hejhej';

  before(function(done) {
    utils.clearDB(done);
  });

  before(function(done) {
    var user1 = new User();
    user1.local.email = email;
    user1.local.password = user1.generateHash(password);
    user1.save(done);
  });

  it('should redirect back to login with no credentials', function(done){
    request(app)
      .post('/login')
      .expect('location', '/login', done);
  });

  it('should redirect to / with correct credentials', function(done){
    request(app)
      .post('/login')
      .send({email: email, password: password})
      .expect(302)
      .expect('Location', '/', done);
  });

  after(function(done) {
    utils.clearDB(done);
  });

});