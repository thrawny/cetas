// This module is used to check if a user is logged in and has the right permissions.

var roles = require('../app/models/enums').roles;
var path = require('path');


// Object with routes and their accepted roles. If a route is not here it is open to all roles.
var access = {
  '/form': [roles.admin, roles.doctor, roles.patient]
}

var api_access = {
  'patients': [roles.doctor]
}
// Check if a user is permitted to access the page.
module.exports.check = function(req) {
  if (access[req.url]) {
    return req.isAuthenticated() &&  access[req.url].indexOf(req.user.role) > -1;
  }
  return true;
}

// Authorize api routes
module.exports.checkAPI = function(req) {
  if (api_access[getBaseUrl(req.url)]) {
    return req.isAuthenticated() && api_access[getBaseUrl(req.url)].indexOf(req.user.role) > -1;   
  }
  return false;
}

function getBaseUrl(path) {
  paths = path.replace('/','').split('/');
  return paths[0];
}