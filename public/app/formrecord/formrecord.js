'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('formrecord', {
        url: '/formrecord/:formrecord_id/:patient_id',
        templateUrl: 'app/formrecord/formrecord.html',
        controller: 'FormrecordCtrl'
      });
  });