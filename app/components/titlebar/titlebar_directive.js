function titleBar($log) {
	'ngInject';
  return {
    replace: true,
    transclude: true,
    scope: true,
    templateUrl: 'titlebar/_titlebar.html',
    bindToController: {
    	title: '@',
    	mobile: '<'
    },
    controller: 'TitlebarCtrl',
    controllerAs: 'tb'
  };
}

export default {
  name: 'titleBar',
  fn: titleBar
};