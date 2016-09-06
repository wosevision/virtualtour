function ButtonbarCtrl($state, $mdSidenav) {
	'ngInject';

  this.toggleMenu = (navID, view) => {
  	//console.log(navID, view);
    if (view && !this.items[view].show) {
      angular.forEach(this.items, (val, key) => { val.show = (key == view); });
      if (!$mdSidenav(navID).isOpen()) {
        $mdSidenav(navID).open();
      }
      // $state.go(view, null, { location: 'false', inherit: true, relative: $state.$current });
    } else {
      $mdSidenav(navID)
        .toggle();
    }
  }
}

export default {
  name: 'ButtonbarCtrl',
  fn: ButtonbarCtrl
};