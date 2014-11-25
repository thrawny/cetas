'use strict';

angular.module('myApp')
  .controller('SignupCtrl', function($scope, $http, $cookies, $state, Auth) {

    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    $scope.submit = function (form) {
      if (form.$valid) {
        $http.put('/api/patients/'+$scope.new_user._id, $scope.new_user)
          .success(function(data, status, headers, config) {
        	  $state.go('index', {message: 'Du registrerade en ny användare'});
            //Auth.getUserData();
          })
          .error(function(data, status, headers, config) {

          });
        
      } else {
        console.log('invalid');
      }  
    };
    
  });