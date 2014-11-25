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

  /*  $scope.submit = function (form) {
      if (form.$valid) {
        $http.post('/api/patients/', $scope.new_user)
          .success(function(data, status, headers, config) {
        	  $state.go('index', {message: 'Du registrerade en ny användare'});
            //Auth.getUserData();
          })
          .error(function(data, status, headers, config) {

          });
        
      } else {
        console.log('invalid');
      }  
    };*/
    $scope.new_user = {};
    
    $scope.submit = function(form) {
        if (!form.$valid) {
        	console.log("Not valid");
          return;
        } else {
        	console.log($scope.new_user);

          $http.post('/api/patients/', $scope.new_user)
            .success(function(data, status, headers, config) {
            	
            	console.log(data);
            	$state.go('index', {message: 'Du registrerade en ny användare'});
            })
            .error(function(data, status, headers, config) {

            });
        }
      }
    
  });