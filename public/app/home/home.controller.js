'use strict';

angular.module('myApp')
  .controller('HomeCtrl', function($scope, $http, $cookies, $state, $stateParams, Auth) {
    $scope.message = $stateParams.message;
    console.log($scope.message);
    
// This stop is not working properly for now.    
	// $http.get("/api/patients")
	// .success(function(data){
	// 	$scope.patients = data;
	// })
	
    
 //    Auth.getUserData().then(function(data) {
 //      $scope.user = data;
 //      $scope.lastvisited = $scope.user.lastvisited;
 //      $scope.user.lastvisited = new Date();
      
 //      $http.put('/api/patients/'+$scope.user._id, $scope.user)
 //      .success(function(data, status, headers, config) {
        
 //      })
 //      .error(function(data, status, headers, config) {
	// 	console.log(data);
 //      })
      
 //    })
    
 //    $scope.formrecord = function(formrecord_id, patient_id) {
	// 	$state.go('formrecord', {formrecord_id: formrecord_id, patient_id: patient_id});
	// }

	
  });
  
  