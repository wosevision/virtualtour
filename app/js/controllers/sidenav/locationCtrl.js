function LocationCtrl($scope, $timeout, $mdSidenav, $log, Location) {
	'ngInject';

  const s = $scope
  
  s.northLocations = [];
  s.dtLocations = [];
  var northLocations = [];
  var dtLocations = [];

  s.currentLocation = {};

  Location.query({ north: true }, function(data) {
    angular.forEach(data, function(location){
      northLocations.push(location);
    });
    s.northLocations = _.reduce( northLocations, reducer, {} );
  });

  Location.query({ downtown: true }, function(data) {
    angular.forEach(data, function(location){
      dtLocations.push(location);
    });
    s.dtLocations = _.reduce( dtLocations, reducer, {} );
  });

  function reducer(output, name) {
    var lCase = name.name.toUpperCase();
    if (output[lCase[0]]) //if lCase is a key
      output[lCase[0]].push(name); //Add name to its list
    else
      output[lCase[0]] = [name]; // Else add a key
    return output;
  }

  s.showLocationDetail = function(location, $event) {
    s.currentLocation = location;
  }


}

export default {
  name: 'LocationCtrl',
  fn: LocationCtrl
};
