'use strict';

angular.module('myApp')
  .controller('MainCtrl', function ($scope, $state, $http, $rootScope, Auth) {
    $scope.$state = $state;
    $scope.language;

    $rootScope.$watch('user', function() {
      $scope.user = $rootScope.user;
    })

    $scope.logout = function() {
      Auth.logout().then(function() {
        console.log('logged out');
        $rootScope.user = undefined;
        $state.go('login');
      })
    }

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

  });