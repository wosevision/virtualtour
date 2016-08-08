function titleBarButton($log) {
	'ngInject';
  return {
    // replace: true,
    transclude: true,
    // scope: true,
    templateUrl: 'titlebar/_titlebar-button.html',
    require: '^titleBar',
    scope: {
    	onClick: '&',
    	active: '=',
			tooltip: '=',
			icon: '='
    },
   //  controllerAs: 'btn',
    link: function(scope, elm, attrs) {
    	// console.log(scope, attrs);
    }
  };
}

export default {
  name: 'titleBarButton',
  fn: titleBarButton
};