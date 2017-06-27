import template from './buttonbar.html';

export const ButtonbarComponent: ng.IComponentOptions = {
  bindings: {
    items: '<',
    open: '<?',
    condensed: '<?',
    mobile: '<?',
    onSelect: '&'
  },
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
  controller: class ButtonbarController implements ng.IController {
    activeState: string;
    menuOpen: boolean;

    showHints: Function;
    onSelect: Function;

    constructor(
      private $scope, 
      private $document, 
      private $state, 
      private $mdSidenav, 
      private UserSession
    ) {
      'ngInject';
      this.$scope = $scope;
      this.$document = $document;
      this.$state = $state;
      this.$mdSidenav = $mdSidenav;
      /**
       * Getter property for whether user settings permit hint tooltips.
       */
      this.showHints = (): boolean => UserSession.settings.showHints.val;
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
     */
    select(state: string) {
      this.activeState = state;
      this.onSelect({
        $event: state
      });
    }

    enterVR() {
      this.$document[0].getElementById('aframe-scene').enterVR();
    }

    $onInit() {
      this.$scope.$watch(
        () => this.$mdSidenav('right').isOpen(),
        (newVal: boolean) => {
          this.menuOpen = newVal;
        }
      );
    }
  },
  template
};
