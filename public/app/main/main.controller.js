'use strict';

angular.module('myApp')
  .controller('MainCtrl', function($scope, $state, $http, $rootScope, Auth) {
    $scope.$state = $state;
    $scope.language;

    $scope.user;

    $rootScope.$watch('user', function() {
      $scope.user = $rootScope.user;
    })



    $scope.logout = function() {
      Auth.logout().then(function() {
        console.log('logged out');
        $state.go('login');
      })
    }

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

  });