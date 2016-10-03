const drilldownMenu = {
		// transclude: true,
		bindings: {
			// onToggle: '&?',
			nextLevel: '@',
			children: '<'
		},
		templateUrl: 'drilldown/_drilldown.html',
		controller: 'DrilldownCtrl as item'
	};

export default {
  name: 'drilldownMenu',
  fn: drilldownMenu
};