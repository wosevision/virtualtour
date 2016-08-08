function titleBar($log) {
	'ngInject';
  return {
    replace: true,
    transclude: true,
    scope: true,
    templateUrl: 'titlebar/_titlebar.html',
    bindToController: {
    	title: '@'
    },
    controller: 'TitlebarCtrl',
    controllerAs: 'tb',
    link: function(scope, elm, attrs) {

    }
  };
}

export default {
  name: 'titleBar',
  fn: titleBar
};