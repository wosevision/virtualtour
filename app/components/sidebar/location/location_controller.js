function LocationCtrl($scope, $state, $timeout, $mdSidenav, $log, LocationResource) {
	'ngInject';

  const lc = this;
  //const s = $scope;

  Object.assign(lc, {
    location: {},
    building: {},
    goTo: function(state, params, $event) {
      // var self = this;
      // Location.get({ code: location.code }, function(data) {
      //   self.Current = data.location;
      $state.go(state, params);
    },
    goBack: function () {
      $state.go('location');
    }
  }, lc);

  lc.activateLoc = function(loc) {
  	// if (!lc.locations[loc].active) {
	  	Object.keys(lc.locations).forEach( function(key) {
	  		let isEqual = (key == loc);
	  		lc.locations[key].active = isEqual ? !lc.locations[key].active : lc.locations[key].active;
	  		lc.locations[key].hidden = !isEqual ? !lc.locations[key].hidden : lc.locations[key].hidden;
	  	});
  	// } else {
	  // 	Object.keys(lc.locations).forEach( function(key) {
	  // 		lc.locations[key].active = false;
	  // 		lc.locations[key].hidden = false;
	  // 	});
  	// }
  }

  lc.locations = {
  	north: {
  		label: 'North',
  		active: false,
  		hidden: false
  	},
  	dt: {
  		label: 'Downtown',
  		active: false,
  		hidden: false
  	}
  }

}

export default {
  name: 'LocationCtrl',
  fn: LocationCtrl
};
