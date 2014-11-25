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
      
     console.log("ID::::"+$scope.patient.patient_id);
    
    $scope.addOperation = function(form) {
    	console.log("HEJ HEJ");
    	$http.post('/api/patients/:p_id/surgeries', $scope.patient)
	    	.success(function(data, status, headers, config) {
	        	console.log("SUCCE");
	        	$state.go('index', {message: 'OK'});
	        })
	        .error(function(data, status, headers, config) {
	        	console.log("ERROR");
	        });
    	
    	//console.log("ID::::"+patient_id);
      }
    
  });