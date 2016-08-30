function drilldownMenu($log) {
	'ngInject';
	return {
		replace: true,
		transclude: true,
		bindToController: {
			children: '<',
			onToggle: '&?'
		},
		templateUrl: 'drilldown/_drilldown.html',
		controller: 'DrilldownCtrl',
		controllerAs: 'item',
		compile(iElem, iAttrs) {
			return (scope, elem, attrs, ctrl) => {
			}
		}
	};
}

export default {
  name: 'drilldownMenu',
  fn: drilldownMenu
};