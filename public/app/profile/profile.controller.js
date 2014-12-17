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

    // Keep user object in the form separate from rest of page.
    $scope.$on('user.update', function(event, args) {
      $scope.new_user = angular.copy(args);
    })

    // Update user data via the api.
    $scope.submit = function(form) {
      if (!form.$valid) {
        return;
      } else {

        $http.put('/api/patients/'+$scope.new_user._id, $scope.new_user)
          .success(function(data, status, headers, config) {
            Auth.getUserData();
            $state.go('index', {message: 'Din profil har uppdaterats.'})
          })
          .error(function(data, status, headers, config) {

          });
      }
    }
    
  });