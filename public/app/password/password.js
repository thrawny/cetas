'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('password', {
        url: '/password',
        templateUrl: 'app/password/password.html',
        controller: 'PasswordCtrl'
      });
  });


