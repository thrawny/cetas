'use strict';

angular.module('myApp')
  .controller('MainCtrl', function ($scope, $state, $http, Auth, $stateParams) {

    Auth.getUserData().then(function(data) {
      $scope.user = data;
    })

    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })

    $scope.state = $state;
    $scope.language;
    console.log($scope.state.current.name)

    
    $scope.$on('user.update', function(event, args) {
      $scope.user = args;
      //console.log(args);
    })

    $scope.logout = function() {
      Auth.logout().then(function() {
        console.log('logged out');
        $state.go('login');
      })
    }

    

  });