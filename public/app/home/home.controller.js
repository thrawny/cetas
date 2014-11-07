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
            var user = JSON.parse($cookies.user);
            $scope.user_id = user.id
            console.log($cookies.user);
          }
        })
    }    
  });