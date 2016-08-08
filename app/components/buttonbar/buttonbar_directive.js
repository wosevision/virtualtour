function buttonBar($log) {
	'ngInject';
  return {
    replace: true,
    templateUrl: 'buttonbar/_buttonbar.html',
    transclude: true,
    bindToController: {
    	items: '=',
    	open: '=?',
    	condensed: '=?'
    },
    controller: 'ButtonbarCtrl',
    controllerAs: 'bar',
    link: function(scope, elm, attrs, ButtonbarCtrl) {

    	if (angular.isUndefined(scope.items) ) {
    		$log.warn('BUTTONBAR:','No menu items defined!');
    		return;
    	} else {
	    	scope.open = scope.open || true;
	    	scope.condensed = scope.condensed || false;
	      ButtonbarCtrl.init(scope);
    	}

    }
  };
}

export default {
  name: 'buttonBar',
  fn: buttonBar
};