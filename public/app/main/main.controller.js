'use strict';

angular.module('myApp')
  .controller('MainCtrl', function($scope, $state) {
    $scope.$state = $state;
    console.log($state);
  });