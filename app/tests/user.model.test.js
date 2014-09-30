var utils = require('./utils');
var should = require('should');

var User = require('../models/user');

describe('User model test', function() {

  var email = 'hej@hej.se';
  var password = 'kaka';
  var user1 = new User();
  user1.local.email = email;
  user1.local.password = user1.generateHash(password);

  before(function(done) {
    utils.connectDB(done);
  });

  before(function(done) {
    utils.clearDB(done);
  });

  it('should be no users from start', function() {
    User.find({}, function(err, users) {
      if (err) return done(err);
      users.length.should.equal(0);
    })
  });

  it('should have one user after a user is saved', function(done) {
    user1.save(function(err, model) {
        if (err) done(err);

        User.find({}, function(err, users) {
          if (err) return done(err);
          users.length.should.equal(1);
          done();
        });

      });
  });

  it('should return false if provided bad password', function(done) {
    User.findOne({'local.email':email}, function(err, user) {
      if (err) done(err);
      user.validPassword('wrongpassword').should.be.false;
      done();
    })
  })

  it('should return true if provided correct password', function(done) {
    User.findOne({'local.email':email}, function(err, user) {
      if (err) done(err);
      user.validPassword(password).should.be.true;
      done();
    })
  })

});