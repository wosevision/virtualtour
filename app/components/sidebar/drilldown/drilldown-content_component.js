const drilldownContent = {
	// transclude: true,
	bindings: {
		nextLevel: '@',
		item: '<'
	},
	// require: '^drilldownMenu',
	templateUrl: 'sidebar/drilldown/_drilldown-content.html'
};

export default {
  name: 'drilldownContent',
  fn: drilldownContent
};
