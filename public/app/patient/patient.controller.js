'use strict';

angular.module('myApp')
  .controller('SinglePatientCtrl', function($scope, $http, $cookies, $state, Auth, $stateParams) {

	// Get language file
    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })
      
    // Define patient object  
    $scope.patient = {};
    
    //Get formdata from api
    $http.get('/api/patients/'+$stateParams.patient_id)
    .success(function(data) {
    	$scope.patient = data;
    })
  });