'use strict';
//
angular.module('myApp', [
  'ui.router',
  'ngSanitize',
  'ngAnimate',
  'ngCookies'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(false);
  });