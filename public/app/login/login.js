'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('patients', {
        url: '/patients',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  });