'use strict';

angular.module('myApp')
  .controller('MainCtrl', function ($scope, $state, $http, Auth) {

    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    $scope.$state = $state;
    $scope.language;

    
    $scope.$on('user.update', function(event, args) {
      $scope.user = args;
      //console.log(args);
    })

    

    $scope.logout = function() {
      Auth.logout().then(function() {
        console.log('logged out');
        $rootScope.user = undefined;
        $state.go('login');
      })
    }

    

  });