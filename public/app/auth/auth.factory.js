// Service object that handles authentication via the node api backend.
angular.module('myApp')
  .factory('Auth', ['$http', '$q', '$cookies', '$rootScope', function($http, $q, $cookies, $rootScope) {

    var login = function(user) {
      var deferred = $q.defer();

      $http.post('/login2', user)
        .then(function(result) {
          // bug in angular, cookie is not set yet, need to wait 100 ms
          setTimeout(function() {
            getUserData();
            deferred.resolve(result.data);
          }, 100);
          
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    var logout = function() {
      var deferred = $q.defer();

      $http.post('/logout2')
        .then(function(result) {
          $rootScope.$broadcast('user.update', {});
          deferred.resolve(true);
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise;

    }

    var isLoggedIn = function() {
      return $cookies.user ? JSON.parse($cookies.user).id : false;
    }


    var getUserData = function() {
      var deferred = $q.defer();
      var id = isLoggedIn();
      if (id) {
        $http.get('/currentuser')
          .then(function(result) {
            $rootScope.$broadcast('user.update', result.data);
            deferred.resolve(result.data);
          }, function(error) {
            deferred.reject(error);
          });
      } else {
        deferred.reject('not logged in'); 
      }
      return deferred.promise;
    }

    return {
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      getUserData: getUserData,
    };
  }]);