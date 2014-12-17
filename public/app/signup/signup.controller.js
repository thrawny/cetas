'use strict';

angular.module('myApp')
  .controller('SignupCtrl', function($scope, $http, $cookies, $state, Auth) {

	// Get language file
    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    // Create dummy object for the new user
    $scope.new_user = {};
    
    // Create new patient via the api.
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
              console.log(data);
            });
        }
      }
    
  });