describe('MainCtrl', function() {
  var scope, $location, createController;

  beforeEach(module('myApp'));

  beforeEach(inject(function($rootScope, $controller, _$location_) {
    $location = _$location_;
    scope = $rootScope.$new();

    createController = function() {
      return $controller('MainCtrl', {
        '$scope': scope
      });
    };
  }));

  it('should logout', function() {
    var controller = createController();
    $location.path('/');
    scope.logout();
    console.log($location.path());
  });
})