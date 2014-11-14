'use strict';

angular.module('myApp')
  .controller('LoginCtrl', function($scope, $http, $state, $rootScope, Auth) {
    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })
    
    $scope.user = {};

    $scope.user_id;
    $scope.mylogin = function(user) {
      Auth.login(user).then(function(user) {
        $state.go('index');
      });
    };
    
  });