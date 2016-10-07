function ScenelinkCtrl($scope, $element, $state, $compile) {
	'ngInject';

// 	const TEMPLATE = `
// <a-entity
// 	ng-attr-wasd-controls="enabled:{{ true }};"
// 	ng-attr-position="{{ $ctrl.position.join(' ') }}">
// 	<a-entity
// 		ng-attr-rotation="{{ $ctrl.rotation.join(' ') }}"
// 		scale="2 4 3"
// 		collada-model="#arrow">
// 	</a-entity>
// </a-entity>`;
// 	this.$onInit = () => {
// 		console.log('init!!!');
// 		$compile(TEMPLATE, function(clone) {
// 			$element.replaceWith(clone);
// 		})($scope);
// 	}
}

export default {
  name: 'ScenelinkCtrl',
  fn: ScenelinkCtrl
};
