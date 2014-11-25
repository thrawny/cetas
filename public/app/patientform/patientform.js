'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('patientform', {
        url: '/patientform',
        templateUrl: 'app/patientform/patientform.html',
        controller: 'PatientFormCtrl'
      });
  });


