function drilldownItemContent($compile) {
	'ngInject';
  return {
		restrict: 'C',
		templateUrl: 'drilldown/_drilldown-item.html',
		require: '^drilldownMenu',
		compile(iElem, iAttrs) {
			return (scope, elem, attrs, ctrl) => {
			}
		}
	};
}

export default {
  name: 'drilldownItemContent',
  fn: drilldownItemContent
};