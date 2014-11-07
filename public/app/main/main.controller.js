'use strict';

angular.module('myApp')
  .controller('MainCtrl', function($scope, $state, $http) {
    $scope.$state = $state;
    $scope.language;

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

  });