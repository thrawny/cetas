'use strict';

angular.module('myApp')
  .controller('LoginCtrl', function($scope, $http, $state, $rootScope, Auth) {
    $scope.user = {};

    $scope.user_id;
    $scope.mylogin = function(user) {
      Auth.login(user).then(function(user) {
        $rootScope.user = user;
        $state.go('index');
      });
    };
    
  });