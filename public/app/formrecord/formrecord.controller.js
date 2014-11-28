'use strict';

angular.module('myApp')
  .controller('FormrecordCtrl', function($scope, $http, $cookies, $state, Auth, $stateParams) {

	// Get language file
    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })
      
    //Fetch parameters  
    $scope.formid = {
    	formrecord_id: $stateParams.formrecord_id,
    	patient_id: $stateParams.patient_id
    };
    
    //Get formdata from api
    $http.get('/api/patients/'+$scope.formid.patient_id +'/formrecords/'+ $scope.formid.formrecord_id)
    .success(function(data) {
    	$scope.record = data;
    })
  });