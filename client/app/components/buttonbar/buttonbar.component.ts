import { UserSessionService } from '../../common/user/user-session.service'; 

import template from './buttonbar.html';

export const ButtonbarComponent: ng.IComponentOptions = {
  bindings: {
    onSelect: '&',
    items: '<',
    visible: '<?',
    condensed: '<?',
    mobile: '<?',
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

    onSelect: Function;

    sceneEl: AFrame.Scene = document.querySelector('a-scene');

    constructor(
      private $scope: ng.IScope, 
      private $document: ng.IDocumentService, 
      private $state: ng.ui.IStateService, 
      private $mdSidenav, 
      private UserSession: UserSessionService
    ) {
      'ngInject';
    }

    /**
     * Getter property for whether user settings permit hint tooltips.
     */
    get showHints(): boolean {
      return this.UserSession.settings && <boolean>this.UserSession.settings.showHints.val;
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
    buttonSelect(state: string) {
      this.activeState = state;
      this.onSelect({
        $event: state
      });
    }

    enterVR() {
      this.sceneEl.enterVR();
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
