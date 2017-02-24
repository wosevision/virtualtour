import { element } from 'angular';

/**
 * The settings controller provides a high-level interface to
 * the app's user preferences and data usage settings, login/logout
 * functions, and a set of automatic usage detection functions.
 * 
 * @param {object} $scope 					 The current scope
 * @param {object} $animate          For animating backdrop only
 * @param {object} $mdUtil           Init backdrop utility
 * @param {object} $popupWindow      Supplies login window
 * @param {object} UserAuth          Authentication check
 * @param {object} UserSession       Holds all settings
 * @param {object} ConnectionDetails Detects network and device
 * @param {object} AUTH_EVENTS       Authorization event names
 */
class SettingsController {
	constructor($scope, $animate, $mdUtil, $popupWindow,
	UserAuth, UserSession, ConnectionDetails,
	AUTH_EVENTS) {
		'ngInject';
		this.$scope = $scope;
		this.$animate = $animate;
		this.$mdUtil = $mdUtil;
		this.$popupWindow = $popupWindow;
		this.UserAuth = UserAuth;
		this.UserSession = UserSession;
		this.ConnectionDetails = ConnectionDetails;
		this.AUTH_EVENTS = AUTH_EVENTS;
	}
	/**
	 * Lifecycle hook to initialize dependencies when component
	 * is mounted.
	 * 
	 * Stores authentication and user preference detail objects,
	 * inits connection object to hold network info. Sets up
	 * one-time `$watch` binding to listen for accordion init
	 * since its contents load async before it can open.
	 *
	 * Sets up `$on('event')` listener for login success; passes
	 * user data from event into controller and syncs applicable
	 * view elements; opens accordion to expose settings to user.
	 */
	$onInit() {
		this.isLoggedIn = this.UserAuth.isAuthenticated;
		this.user = this.UserSession.user;
		this.settings = this.UserSession.settings;
		this.usage = this.UserSession.usage;

		/**
		 * This property will hold the user's network and
		 * device information when it becomes available; it
		 * remains false until availability.
		 *
		 * @memberof SettingsCtrl
		 * @type {boolean|object}
		 * @example
		 * {
		 *   "network": {
		 *     "speeds": { ... },
		 *     ...
		 *   },
		 *   "useragent": {
		 *     "device": { ... },
		 *     ...
		 *   }
		 * }
		 */
		this.connection = false;

		/**
		 * The accordion initializer watches for a valid
		 * instance and opens the accordion once it becomes
		 * available. Performed once then deregistered.
		 * 
		 * @memberof SettingsCtrl
		 */
		const accordionReady = this.$scope.$watch('accordion', accordion => {
			if (accordion) {
				this.$scope.$applyAsync(() => {
					this.isLoggedIn() && accordion.expandAll();
				});
				accordionReady();
			}
		});

		this.$scope.$on(this.AUTH_EVENTS.loginSuccess, this.loadUserAfterLogin.bind(this) );
		
		this.getUsageLevel();
	}

	/**
	 * Expands all accordion sections.
	 */
	expandAll() {
		this.$scope.accordion.expandAll();
	}
	/**
	 * Collapses all accordion sections.
	 */
	collapseAll() {
		this.$scope.accordion.collapseAll();
	}

	/**
	 * Prompts user for login using `$popupWindow` service's `login()` dialog.
	 * @return {Promise} Status of popupWindow
	 */
	promptLogin() {
		return this.$popupWindow.login();
	}
	/**
	 * Logs user out directly with `UserAuth.logout()`.
	 */
	logout() {
		const backdrop = this.$mdUtil.createBackdrop(this.$scope, "md-dialog-backdrop md-opaque");
		backdrop[0].tabIndex = -1;
		this.$animate.enter(backdrop, element(document.body), null);
		this.UserAuth.logout().then(() => {
			this.$animate.leave(backdrop);
			this.collapseAll();
		});
	}

	/**
	 * Stores user info and opens accordion sections when login is detected.
	 * 
	 * @param  {Event} event  The originating event object
	 * @param  {Object} user  The newly logged-in user
	 */
	loadUserAfterLogin(event, user) {
		this.user = this.UserSession.user;
		this.settings = this.UserSession.settings;
		this.usage = this.UserSession.usage;
		this.updateUsage();
		this.updateSettings();
		this.expandAll();
	}

	/**
	 * Updates the user's setting preferences.
	 */
	updateSettings() {
		this.UserSession.settings = this.settings;
	}
	/**
	 * Updates the user's usage preferences and usage level description text.
	 * 
	 * @param  {[object]} usage Optional data override
	 */
	updateUsage(usage) {
		this.UserSession.usage = usage || this.usage;
		this.getUsageLevel();
	}
	/**
	 * Uses the `ConnectionDetails` service to convert the current
	 * session's usage preferences into a user-friendly description
	 * of what the preferences' effects will be.
	 * - Grabs `UserSession.usage` details
	 * - Uses `ConnectionDetails.calculateUsageLevel()` to tally usage stats from details
	 * - Passes resulting tally to `ConnectionDetails.getLabelsFromTally()`
	 * - Assigns resulting descriptions to controller
	 */
	getUsageLevel() {
		this.ConnectionDetails.calculateUsageLevel(this.UserSession.usage).then(usageLevelTally => {
			this.usageLevel = this.ConnectionDetails.getLabelsFromTally(usageLevelTally);
		});
	}

	/**
	 * User-activated function for auto-optimizing usage
	 * level using the `ConnectionDetails` service.
	 * - Sets loading animation during detection
	 * - Fetches connection information with `detect()`
	 * - Stores returned connection information
	 * - Sets optimized usage settings with `optimize()`
	 */
	detectConnection() {
		if (this.usage.auto.val) {
			this.connection = { loading: true };
			this.ConnectionDetails.detect().then(connection => {
				this.connection = connection;
				this.usage = this.ConnectionDetails.optimize(connection);
				this.updateUsage();
			});
		}
	}
}

export default SettingsController;
