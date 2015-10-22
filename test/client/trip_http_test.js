require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('trips controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('carpoolApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('TripsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.trips)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('TripsController', {$scope: $scope});
    }));


    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to make a get request to get users trips', function() {
      $httpBackend.expectGET('/api/trips').respond(200, [{"origin": "WA"}]);
      $scope.getMyTrips();
      $httpBackend.flush();
      expect($scope.trips[0].origin).toBe('WA');
    });

    it('should be able to make a get request to search for new trips', function() {
      
    });

    it('should be able to create a trip', function() {
      var newTrip = {"tripName": "to work", "origin":"address", "originTime":"08:00 AM", "dest":"map coordinates",
                     "destTime": "10:00 AM", "weekDays":"mon, tue, thu, sat"};
      $httpBackend.expectPOST('/api/trips', {newTrip: newTrip}).respond(200, {_id: 1, tripName: "success"});
      $scope.newTrip = {tripName: 'newTrip'};
      $scope.createTrip(newTrip);
      $httpBackend.flush();
      expect($scope.trips[0].tripName).toBe('success');
    });
  });
});
