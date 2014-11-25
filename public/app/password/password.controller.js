'use strict';

angular.module('myApp')
  .controller('PasswordCtrl', function($scope, $http, $cookies, $state, Auth) {

    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    $scope.pass = {}

    $scope.submit = function (form) {
      if (form.$valid) {
        if ($scope.pass.password === $scope.pass.confirm) {
          
          console.log('valid');
        }
      } else {
        console.log('invalid');
      }  
    };
    
  });