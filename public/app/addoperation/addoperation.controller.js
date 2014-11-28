'use strict';

angular.module('myApp')
  .controller('AddOperationCtrl', function($scope, $http, $cookies, $state, Auth, $stateParams) {
	  
	// Get language file
    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })
      
    $scope.patient = {
    	patient_id: $stateParams.patient_id
    };
    
    $scope.addOperation = function(form) {
    	$http.post('/api/patients/:p_id/surgeries', $scope.patient)
	    	.success(function(data, status, headers, config) {
	        	$state.go('index', {message: 'OK'});
	        })
	        .error(function(data, status, headers, config) {
	        	//TODO: do something...
	        });
      }
  });