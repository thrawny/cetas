'use strict';

angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('addoperation', {
        url: '/addOperation/:patient_id',
        templateUrl: 'app/addoperation/addoperation.html',
        controller: 'AddOperationCtrl'
      });
  });