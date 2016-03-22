angular.module('controllers')
  .controller('poiController', ['$scope', '$state', 'LocationService', function($scope, $state, LocationService) {
    $scope.pois = LocationService.all();
    $scope.locations = LocationService.locations();
    $scope.location = LocationService.get($state.params.id || '');
  }]);
