function titleBarButton($log) {
	'ngInject';
  return {
    templateUrl: 'titlebar/_titlebar-button.html',
    require: '^titleBar',
    scope: {
    	onClick: '&',
    	label: '@',
    	active: '<',
			tooltip: '<',
			icon: '<'
    }
  };
}

export default {
  name: 'titleBarButton',
  fn: titleBarButton
};