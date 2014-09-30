// This module is used to check if a user is logged in and has the right permissions.

var roles = require('../app/models/enums').roles;

// Object with routes and their accepted roles. If a route is not here it is open to all roles.
var access = {
  '/form': [roles.admin, roles.doctor, roles.patient]
}

// Check if a user is permitted to access the page.
module.exports.check = function(req) {
  if (access[req.url]) {
    return req.isAuthenticated() &&  access[req.url][req.user.role];
  }
  return true;
}