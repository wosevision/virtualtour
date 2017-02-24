/**
 * The buttonbar controller is responsible for managing when the sidebar
 * menu is open and which state is active. A single button needs to perform
 * different actions with a single click depending on the current state of
 * the sidebar – those actions (the ones defined in this controller) are
 * _distinct and separate from the actions performed by the buttons themselves_,
 * which are defined in the parent controller.
 *
 * The exception is the "Enter VR" button, which is always present at the bottom of
 * the buttonbar and has its method stored on this controller.
 */
class ButtonbarController {
	constructor($scope, $document, $state, $mdSidenav, UserSession) {
		'ngInject';
		this._$scope = $scope;
		this._$document = $document;
		this._$state = $state;
		this._$mdSidenav = $mdSidenav;
		/**
		 * Getter property for whether user settings permit hint tooltips.
		 * @return {Boolean} Tooltips on (true) or off (false)
		 */
  	this.showHints = () => UserSession.settings.showHints.val;
	}

	/**
	 * Activate the state associated with a button.
	 *
	 * In the context of this controller, the buttons are only responsible for
	 * handling one of three scenarios:
	 *
	 * - If the **sidebar is closed**, clicking a button should **open the sidebar
	 * and go to the button's associated state** no matter what.
	 * - If the **sidebar is open** and the **button clicked is for the active state**,
	 * the **sidebar should close and return to the "home" state**.
	 * - If the **sidebar is open** and the **clicked button's state is different from the
	 * active state**, the **sidebar should remain open and transition to the new state**.
	 * 
	 * @param  {String} state Name of the state to transition to
	 * @return {Promise}      Represents the state of the transition
	 */
  select(state) {
    if (this.menuOpen && this._$state.includes(state)) {
      return this._$mdSidenav('right').close().then(() => {
	      return this._$state.transitionTo('home');
      });
    } else { 
	  	return this._$state.transitionTo(state).then(() => {
	      this._$mdSidenav('right').open();
      });
    }
  }

  enterVR() {
  	this._$document[0].getElementById('aframe-scene').enterVR();
  }

  $onInit() {
		this._$scope.$watch(
			() => this._$mdSidenav('right').isOpen(),
			(newVal) => {
				this.menuOpen = newVal;
			}
		);
  }

}

export default ButtonbarController;
