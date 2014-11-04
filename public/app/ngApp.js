'use strict';
//
angular.module('myApp', [
  'ui.router',
  'ngSanitize',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(false);
  });