/**
 * This controller manages a welcome dialog created by the `$mdDialog`
 * service, which the user is presented with when the application first
 * launches (if their preferences include the welcome window).
 *
 * It contains wrapper methods for `$mdDialog`'s injected utility methods
 * (hide/cancel), as well as methods for initializing the onboard tutorial
 * and syncing user settings (e.g. when user dismisses welcome dialog).
 *
 * @param  {object} $mdDialog   ng-material's dialog service
 * @param  {object} UserSession The current user session/settings
 * @param  {object} nzTour      Onboard tour service
 * @param  {object} TOUR_STEPS  Configuration of onboard tour
 */
class WelcomeController {
	/**
	 * Initializes dialog's dependencies.
	 */
	constructor(
		$state,
		$mdDialog,
		$mdSidenav,
		UserSession,
		nzTour,
		TOUR_STEPS,
		WELCOME_TIP_LIST,
		WELCOME_TIPS,
	) {
	  'ngInject';
	  this._$state = $state;
		this._$mdDialog = $mdDialog;
		this._$mdSidenav = $mdSidenav;

		this.UserSession = UserSession;
		this.OnboardTour = nzTour;
		this.TOUR_STEPS = TOUR_STEPS;
		this.WELCOME_TIPS = WELCOME_TIPS;

		this.welcomeTipsList = WELCOME_TIP_LIST;
		this.currentTips = false;
	}

	/**
	 * Hides the dialog; fulfills promise.
	 * @return {Promise} Promise that will be fulfilled on hide
	 */
  hide() {
    return this._$mdDialog.hide();
  }

	/**
	 * Cancels the dialog; rejects promise.
	 * @return {Promise} Promise that will be rejected on cancel
	 */
  cancel() {
    return this._$mdDialog.cancel();
  }

  /**
   * Hides the dialog, providing an answer to resolve its promise with.
   * @param  {string} answer The result of the dialog upon hide
   * @return {Promise}       Promise containing the resolved answer
   */
  answer(answer) {
    return this._$mdDialog.hide(answer);
  }

  /**
   * Changes the active view of the dialog, e.g. "user tips" detail panels. 
   * @param  {string} view The view to transition to
   */
  viewTip(tip) {
  	console.log(this.WELCOME_TIPS[tip]);
  	this.currentTips = this.WELCOME_TIPS[tip];
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
   * @return {Promise} Promise representing tour completion
   */
  startTour() {
    this._$mdDialog.hide('tour');
  	return this.OnboardTour.start(this.TOUR_STEPS);
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

	goToSettings() {
    this._$state.go('settings');
    this._$mdSidenav('right').open();
    // this.answer('tour');
	}
}

export default WelcomeController;
