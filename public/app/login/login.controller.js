'use strict';

angular.module('myApp')
  .controller('LoginCtrl', function($scope, $http, Auth) {
    $scope.user = {};

    $scope.user_id;
    $scope.mylogin = function(user) {
      Auth.login(user).then(function(user_id) {
        console.log(user_id);
      })
    }
    
  });