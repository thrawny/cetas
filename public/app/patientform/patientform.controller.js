'use strict';

angular.module('myApp')
  .controller('PatientFormCtrl', function($scope, $http, $cookies, $state, Auth, $stateParams) {



    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      });

    if($stateParams.patient_id) {
      console.log($stateParams.patient_id);
      $scope.post_id = $stateParams.patient_id;
    } else {
      $scope.post_id = $scope.user._id;
    }

    $scope.record = {
      pain : 50,
      //painKillers : "",
      nausea : 50,
      narcosis : 50,
      dailyActivities : 50,
      routine : 50,
      satisfied : 50,
      //worstThing : "",
      assess : 50,
      title:  "Svara på formulär"
    };
    

    $scope.submit = function (form) {
      if (form.$valid) {
        $http.post('/api/patients/'+$scope.post_id+'/formrecords?format=json', $scope.record)
          .success(function(data, status, headers, config) {
            console.log(data);
            $state.go('index', {message: 'Du fyllde i ett formulär'});
          })
          .error(function(data, status, headers, config) {

          })
        
      } else {
        console.log('invalid');
      }  
    };
    
  });