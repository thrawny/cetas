'use strict';

angular.module('myApp')
  .controller('LoginCtrl', function($scope, $http, $state, $rootScope, Auth) {
    $http.get('/lang')
      .success(function(data) {
        $scope.language = data;
      })
    
    $scope.user = {};

    // Call auth factory with credentials. 
    $scope.user_id;
    $scope.submit = function(login) {
      if (!login.$valid) return;
      Auth.login($scope.user).then(
        function(user) {
          $state.go('index');
        }, 
        function(error) {
          $scope.message = 'Felaktiga inloggningsuppgifter.'
          $scope.user = {};
        })
    };
    
  });