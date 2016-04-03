angular.module('controllers')
  .controller('poiController', ['$scope', '$state', 'UIStateService', 'LocationService', function($scope, $state, UIStateService, LocationService) {
    $scope.pois = [];
    $scope.location = {};
    LocationService.getAll().then(function(response){
      $scope.pois = response.data;
    });
    LocationService.getScenes($state.params.location || '').then(function(response){
      $scope.location = response.data[0];
    });
    UIStateService.set('location', $state.params.location);
  }]);
