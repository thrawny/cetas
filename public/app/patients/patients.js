'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('patients', {
        url: '/patients',
        templateUrl: 'app/patients/patients.html',
        controller: 'PatientCtrl'
      });
  });