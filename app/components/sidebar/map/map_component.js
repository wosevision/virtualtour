const campusMap = {
		// transclude: true,
		bindings: {
			// onToggle: '&?',
			markers: '<'
		},
		templateUrl: 'sidebar/map/_map.html',
		controller: 'MapCtrl'
	};

export default {
  name: 'campusMap',
  fn: campusMap
};