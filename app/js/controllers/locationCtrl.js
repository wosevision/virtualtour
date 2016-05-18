function LocationCtrl($scope, $timeout, $mdSidenav, $log, Location) {
	'ngInject';
  
  $scope.northLocations = [];
  $scope.dtLocations = [];
  var northLocations = [];
  var dtLocations = [];

  Location.query({ north: true }, function(data) {
    angular.forEach(data, function(location){
      northLocations.push(location);
    });
    $scope.northLocations = _.reduce( northLocations, reducer, {} );
  });

  Location.query({ downtown: true }, function(data) {
    angular.forEach(data, function(location){
      dtLocations.push(location);
    });
    $scope.dtLocations = _.reduce( dtLocations, reducer, {} );
  });

  function reducer(output, name) {
    var lCase = name.name.toUpperCase();
    if (output[lCase[0]]) //if lCase is a key
      output[lCase[0]].push(name); //Add name to its list
    else
      output[lCase[0]] = [name]; // Else add a key
    return output;
  }

}

export default {
  name: 'LocationCtrl',
  fn: LocationCtrl
};
