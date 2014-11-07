'use strict';
//
angular.module('myApp', [
  'ui.router',
  'ngSanitize',
  'ngAnimate',
  'ngCookies'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(false);
  })

  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (!Auth.isLoggedIn() && toState.name !== 'login') {
        console.log('noauth');
        event.preventDefault();
        $state.go('login');
      }
    })
  })


  .factory('Auth', ['$http', '$q', '$cookies', function($http, $q, $cookies) {

    var login = function(user) {
      var deferred = $q.defer();

      $http.post('/login2', user)
        .then(function(result) {
          deferred.resolve(true);
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    var logout = function() {
      var deferred = $q.defer();

      $http.post('/logout2')
        .then(function(result) {
          deferred.resolve(true);
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise;

    }

    var isLoggedIn = function() {
      return $cookies.user ? JSON.parse($cookies.user).id : false;
    }  

    return {
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn
    };
  }]);