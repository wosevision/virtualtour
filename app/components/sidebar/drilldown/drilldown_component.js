const drilldownMenu = {
		bindings: {
			nextLevel: '@',
			children: '<'
		},
		templateUrl: 'sidebar/drilldown/_drilldown.html',
		controller: 'DrilldownCtrl as item'
	};

export default {
  name: 'drilldownMenu',
  fn: drilldownMenu
};