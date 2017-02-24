import template from './titlebarButton.html';

function titleBarButtonDirective($log) {
	'ngInject';
  return {
    template,
    require: '^titleBar',
    scope: {
    	onClick: '&',
    	label: '@',
			class: '@',
    	active: '<',
			tooltip: '<',
			icon: '<'
    }
  };
}

export default titleBarButtonDirective;
