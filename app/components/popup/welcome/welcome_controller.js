/**
 * This controller manages a welcome dialog created by the `$mdDialog`
 * service, which the user is presented with when the application first
 * launches (if their preferences include the welcome window).
 *
 * It contains wrapper methods for `$mdDialog`'s injected utility methods
 * (hide/cancel), as well as methods for initializing the onboard tutorial
 * and syncing user settings (e.g. when user dismisses welcome dialog).
 *
 * @param  {object} $scope      The dialog scope
 * @param  {object} $mdDialog   ng-material's dialog service
 * @param  {object} UserSession The current user session/settings
 * @param  {object} nzTour      Onboard tour service
 * @param  {object} TOUR_STEPS  Configuration of onboard tour
 */
class DialogCtrl {
	/**
	 * Initializes dialog's dependencies.
	 */
	constructor($scope, $mdDialog, UserSession, nzTour, TOUR_STEPS, WELCOME_TIPS) {
	  'ngInject';
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;
		this.UserSession = UserSession;
		this.OnboardTour = nzTour;
		this.TOUR_STEPS = TOUR_STEPS;
		this.WELCOME_TIPS = WELCOME_TIPS;

		this.currentTips = false;
	}

	/**
	 * Hides the dialog; fulfills promise.
	 * @return {Promise} Promise that will be fulfilled on hide
	 */
  hide() {
    return this.$mdDialog.hide();
  }

	/**
	 * Cancels the dialog; rejects promise.
	 * @return {Promise} Promise that will be rejected on cancel
	 */
  cancel() {
    return this.$mdDialog.cancel();
  }

  /**
   * Hides the dialog, providing an answer to resolve its promise with.
   * @param  {string} answer The result of the dialog upon hide
   * @return {Promise}       Promise containing the resolved answer
   */
  answer(answer) {
    return this.$mdDialog.hide(answer);
  }

  /**
   * Changes the active view of the dialog, e.g. "user tips" detail panels. 
   * @param  {string} view The view to transition to
   */
  viewTip(tip) {
  	console.log(this.WELCOME_TIPS[tip]);
  	this.currentTips = this.WELCOME_TIPS[tip];
  }

  nextTip(index) {
  	console.log(this.currentTips.tips.length);
  	this.activeTip = (index === this.currentTips.tips.length - 1) ? 0 : (index + 1);
  }

  /**
   * Hides the dialog with the answer `'tour'` and begins the onboard tour
   * using the `TOUR_STEPS` as a config object.
   * @return {Promise} Promise representing tour completion
   */
  startTour() {
    this.$mdDialog.hide('tour');
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
}

export default {
  name: 'DialogCtrl',
  fn: DialogCtrl
};
