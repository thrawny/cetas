'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('patient', {
        url: '/patients/:patient_id',
        templateUrl: 'app/patient/patient.html',
        controller: 'SinglePatientCtrl'
      });
  });