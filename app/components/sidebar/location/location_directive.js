function locationMenu($log) {
	'ngInject';
  return {
    replace: true,
    transclude: true,
    scope:true,
    templateUrl: 'sidebar/location/_location.html',
    controller: 'LocationCtrl',
    controllerAs: 'lc',
    link: function(scope, elm, attrs) {

    }
  };
}

export default {
  name: 'locationMenu',
  fn: locationMenu
};