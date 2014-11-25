'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        params: { message: '' },
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  });