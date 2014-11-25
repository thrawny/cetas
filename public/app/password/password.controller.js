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

    $scope.pass = { id: $scope.user._id };

    $scope.submit = function (form) {
      if (form.$valid) {
        if ($scope.pass.password === $scope.pass.confirmpassword) {
          $http.post('/password', $scope.pass)
            .success(function(data, status, headers, config) {
              $state.go('index');
            });
          
        } else {
          $scope.message = "Lösenorden stämmer inte överens."
        }
      } else {
        console.log('invalid');
      }  
    };
    
  });