'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('mypatients', {
        url: '/mypatients',
        templateUrl: 'app/mypatients/mypatients.html',
        controller: 'MyPatientsCtrl'
      });
  });