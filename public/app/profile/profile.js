'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });