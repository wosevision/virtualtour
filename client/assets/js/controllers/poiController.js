angular.module('controllers')
  .controller('poiController', ['$scope', '$state', 'UIStateService', 'LocationService', function($scope, $state, UIStateService, LocationService) {
    $scope.pois = [];
    LocationService.getAll().then(function(response){
      $scope.pois = response.data;
    });
    //$scope.location = LocationService.get($state.params.location || '');
    UIStateService.set('location', $state.params.location);
  }]);
