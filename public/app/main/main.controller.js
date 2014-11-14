'use strict';

angular.module('myApp')
  .controller('MainCtrl', function ($scope, $state, $http, Auth) {

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    $scope.$state = $state;
    $scope.language;

    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $scope.logout = function() {
      Auth.logout().then(function() {
        console.log('logged out');
        $rootScope.user = undefined;
        $state.go('login');
      })
    }

    

  });