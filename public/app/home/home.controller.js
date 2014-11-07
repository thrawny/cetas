'use strict';

angular.module('myApp')
  .controller('HomeCtrl', function($scope, $http, $cookies) {
    $scope.user = {};

    $scope.user_id;
    $scope.mylogin = function(user) {
      console.log(user);
      $http.post('/login2', user).
        success(function(data, status, headers, config) {
          $scope.status = status;
          if(status === 200) {
            $scope.user_id = $cookies.user;
            console.log($cookies.user);
          }
        })
    }    
  });