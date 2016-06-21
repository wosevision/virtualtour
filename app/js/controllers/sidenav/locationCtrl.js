function LocationCtrl($scope, $state, $timeout, $mdSidenav, $log, Location) {
	'ngInject';

  const l = this;
  const s = $scope;

  const L = Object.assign(l, {
    North: [],
    Downtown: [],
    showDetail: function(location, $event) {
      // var self = this;
      // Location.get({ code: location.code }, function(data) {
      //   self.Current = data.location;
        $state.go('location.detail', { code: location.code });
        //console.log(data);
      // });
    },
    goBack: function () {
      $state.go('location');
    }
  }, l);
  


  var northLocations = [];
  var dtLocations = [];

  Location.query({ north: true }, function(data) {
    angular.forEach(data, function(location){
      northLocations.push(location);
    });
    l.North = _.reduce( northLocations, reducer, {} );
  });

  Location.query({ downtown: true }, function(data) {
    angular.forEach(data, function(location){
      dtLocations.push(location);
    });
    l.Downtown = _.reduce( dtLocations, reducer, {} );
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
