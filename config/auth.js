// This module is used to check if a user is logged in and has the right permissions.

var roles = require('../app/models/enums').roles;
var path = require('path');


// Object with routes and their accepted roles. If a route is not here it is open to all roles.
var access = {
  '/form': [roles.patient],
  '/mypatients': [roles.admin, roles.doctor],
  '/formrecord': [roles.doctor]
}

// Who can access different API routes (includes subroutes). If not in the list, nobody can access it.
var api_access = {
  'patients': [roles.patient, roles.doctor],
  'formrecord': [roles.patient, roles.doctor]
}

// Check if a user is permitted to access the page.
module.exports.check = function(req) {
  if (access[req.url]) {
    return req.isAuthenticated() &&  access[req.url].indexOf(req.user.role) > -1;
  }
  return true; // If the page was not found in the list, allow everyone to view it.
}

// Authorize api routes
module.exports.checkAPI = function(req) {
  if (api_access[getBaseUrl(req.url)]) {
    return req.isAuthenticated() && api_access[getBaseUrl(req.url)].indexOf(req.user.role) > -1;   
  }
  return false; // Block access if the api route was not found in api_access
}

function getBaseUrl(path) {
  paths = path.replace('/','').split('/');
  return paths[0];
}