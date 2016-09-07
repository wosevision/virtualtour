function drilldownItemContent($compile) {
	'ngInject';
  return {
		restrict: 'C',
		templateUrl: 'drilldown/_drilldown-item.html',
		// template: function(tElem, tAttrs) {
		// 		console.log(tAttrs)
		// 	return `${tAttrs}`;
		// },
		require: '^drilldownMenu',
		compile(iElem, iAttrs) {
			return (scope, elem, attrs, ctrl) => {
				console.log(scope);
			}
		}
	};
}

export default {
  name: 'drilldownItemContent',
  fn: drilldownItemContent
};