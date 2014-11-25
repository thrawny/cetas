'use strict';

angular.module('myApp')
  .controller('HomeCtrl', function($scope, $http, $cookies, $state, $stateParams) {
    $scope.message = $stateParams.message;
    console.log($scope.message);
  });