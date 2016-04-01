angular.module('controllers')
  .controller('poiController', ['$scope', '$state', 'UIStateService', 'LocationService', function($scope, $state, UIStateService, LocationService) {
    $scope.pois = LocationService.all();
    $scope.locations = LocationService.locations();
    $scope.location = LocationService.get($state.params.location || '');
    UIStateService.set('location', $state.params.location);
  }]);
