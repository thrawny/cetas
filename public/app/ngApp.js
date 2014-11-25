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
    });
  });