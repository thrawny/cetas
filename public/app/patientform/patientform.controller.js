'use strict';

angular.module('myApp')
  .controller('PatientFormCtrl', function($scope, $http, $cookies, $state, Auth) {

    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

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
        $http.post('/api/patients/'+$scope.user._id+'/formrecords?format=json', $scope.record)
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