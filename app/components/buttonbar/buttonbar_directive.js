function buttonBar($log) {
	'ngInject';
  return {
    replace: true,
    templateUrl: 'buttonbar/_buttonbar.html',
    transclude: true,
    bindToController: {
    	items: '<',
    	open: '<?',
    	condensed: '<?',
    	mobile: '<?'
    },
    controller: 'ButtonbarCtrl',
    controllerAs: 'bar',
    link: function(scope, elm, attrs, ButtonbarCtrl) {

    }
  };
}

export default {
  name: 'buttonBar',
  fn: buttonBar
};