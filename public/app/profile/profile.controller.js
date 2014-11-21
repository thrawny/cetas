'use strict';

angular.module('myApp')
  .controller('ProfileCtrl', function($scope, $http, $cookies, $state, Auth) {

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    Auth.getUserData().then(function(data) {
      $scope.new_user = angular.copy(data);
    })

    $scope.$on('user.update', function(event, args) {
      $scope.new_user = angular.copy(args);
    })

    $scope.submit = function(form) {
      if (!form.$valid) {
        return;
      } else {

        $http.put('/api/patients/'+$scope.new_user._id, $scope.new_user)
          .success(function(data, status, headers, config) {
            Auth.getUserData();
          })
          .error(function(data, status, headers, config) {

          });
      }
    }
    
  });