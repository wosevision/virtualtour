import { forEach } from 'angular';

class ButtonbarCtrl {
	constructor($scope, $state, $mdSidenav) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.$mdSidenav = $mdSidenav;
		this.$scope.$watch(
			() => this.$mdSidenav('right').isOpen(),
			(newVal) => {
				this.menuOpen = newVal;
			}
		);
	}

  toggleMenu(navID, view) {
  	// console.log(navID, view, this.items);
    if (view && !this.items[view].show) {
      
      forEach(
      	this.items,
      	(val, key) => val.show = (key == view)
      );
      
      if (!this.menuOpen) {
        this.$mdSidenav(navID).open();
      }
    } else {
      this.$mdSidenav(navID)
        .toggle();
    }
  }

}

export default {
  name: 'ButtonbarCtrl',
  fn: ButtonbarCtrl
};
