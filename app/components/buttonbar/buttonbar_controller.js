class ButtonbarCtrl {
	constructor($scope, $document, $state, $mdSidenav, UserSession) {
		'ngInject';
		this.$scope = $scope;
		this.$document = $document;
		this.$state = $state;
		this.$mdSidenav = $mdSidenav;
  	this.showHints = () => UserSession.settings.showHints.val;
	}

  select(item, state) {
      
    if (this.menuOpen && this.$state.includes(state)) {
      return this.$mdSidenav('right').close().then(() => {
	      return this.$state.transitionTo('home');
      });
    } else { 
	  	return this.$state.transitionTo(state).then(() => {
	      this.$mdSidenav('right').open();
      });
    }
  }

  enterVR() {
  	this.$document[0].getElementById('aframe-scene').enterVR();
  }

  $onInit() {
		this.$scope.$watch(
			() => this.$mdSidenav('right').isOpen(),
			(newVal) => {
				this.menuOpen = newVal;
			}
		);
  }

}

// ButtonbarCtrl.$inject = ['$scope', '$state', '$mdSidenav'];

export default {
  name: 'ButtonbarCtrl',
  fn: ButtonbarCtrl
};
