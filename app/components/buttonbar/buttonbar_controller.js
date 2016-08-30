function ButtonbarCtrl($state, $mdSidenav, $buttonBar) {
	'ngInject';

	let update = (toUpdate, value) => {
		$buttonBar[toUpdate] = value;
		this[toUpdate] = $buttonBar[toUpdate];
	}

	this.init = (bar) => {
		$buttonBar.init(bar);
		update('items', bar.items);
		update('open', bar.open);
		update('condensed', bar.condensed);
		
		bar.$watch('open', (value) => {
			update('open', value);
		});
		bar.$watch('condensed', (value) => {
			update('condensed', value);
		});
	}

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
