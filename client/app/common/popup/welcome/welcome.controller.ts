/**
 * This controller manages a welcome dialog created by the `$mdDialog`
 * service, which the user is presented with when the application first
 * launches (if their preferences include the welcome window).
 *
 * It contains wrapper methods for `$mdDialog`'s injected utility methods
 * (hide/cancel), as well as methods for initializing the onboard tutorial
 * and syncing user settings (e.g. when user dismisses welcome dialog).
 */
export class WelcomeController implements ng.IController {
  welcomeTipsList: vt.IWelcomeTip[];
  currentTips: vt.IWelcomeTipGroup;
  activeTip: number;

  showWelcome: boolean;

  onButtonClick: ({ $event }: { $event: ng.IAngularEvent }) => ng.IPromise<any>;

	constructor(
		private $state: ng.ui.IStateService,
		private $mdDialog,
		private $mdSidenav,
		private UserSession,
		private nzTour,
		private TOUR_STEPS,
		private WELCOME_TIP_LIST: vt.IWelcomeTip[],
		private WELCOME_TIPS: {
      [key: string]: vt.IWelcomeTipGroup
    },
	) {
	  'ngInject';
		this.welcomeTipsList = WELCOME_TIP_LIST;
	}

	/**
	 * Hides the dialog; fulfills promise.
	 */
  hide(): Promise<any> {
    return this.$mdDialog.hide();
  }

	/**
	 * Cancels the dialog; rejects promise.
	 */
  cancel(): Promise<any> {
    return this.$mdDialog.cancel();
  }

  /**
   * Hides the dialog, providing an answer to resolve its promise with.
   */
  answer(answer: string): Promise<any> {
    return this.$mdDialog.hide(answer);
  }

  /**
   * Changes the active view of the dialog, e.g. "user tips" detail panels. 
   * @param  {string} view The view to transition to
   */
  viewTip(tip: string): vt.IWelcomeTipGroup {
  	if (this.WELCOME_TIPS[tip]) {
	  	this.currentTips = this.WELCOME_TIPS[tip];
      console.log('[welcome.controller] viewTip', this.currentTips);
      return this.currentTips;
  	}
  }

  nextTip() {
  	this.activeTip = (this.activeTip === this.currentTips.tips.length - 1) ? 0 : (this.activeTip + 1);
  }
  prevTip() {
  	this.activeTip = (this.activeTip === 0) ? this.currentTips.tips.length - 1 : (this.activeTip - 1);
  }

  /**
   * Hides the dialog with the answer `'tour'` and begins the onboard tour
   * using the `TOUR_STEPS` as a config object.
   */
  startTour(): Promise<any> {
    this.$mdDialog.hide('tour');
  	return this.nzTour.start(this.TOUR_STEPS);
  }

  /**
   * Performs a from»to»from assignment of user settings to force a sync
   * with the setter. Ensures that the dialog's 'Do not show this message again'
   * checkbox affects the user's settings.
   */
  syncSettings() {
  	const currentSettings = this.UserSession.settings;
  	currentSettings.showWelcome.val = this.showWelcome;
  	this.UserSession.settings = currentSettings;
  }

	buttonClick($event) {
    console.log('[welcome.controller] buttonClick', $event);
    this.onButtonClick({ $event });
	}
}
