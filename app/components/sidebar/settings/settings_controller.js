import { element } from 'angular';

/**
 * The settings controller provides a high-level
 * interface to the app's user preferences and data
 * usage settings, login/logout functions, and a set
 * of automatic usage detection functions.
 * @param {object} $scope
 * @param {object} $q
 * @param {object} $animate          For animating backdrop only
 * @param {object} $mdUtil           Init backdrop utility
 * @param {object} $popupWindow      Supplies login window
 * @param {object} UserAuth          Authentication check
 * @param {object} UserSession       Holds all settings
 * @param {object} ConnectionDetails Detects network and device
 * @param {object} AUTH_EVENTS       Authorization event names
 */
function SettingsCtrl(
	$scope, $q, $animate, $mdUtil, $popupWindow,
	UserAuth, UserSession, ConnectionDetails,
	AUTH_EVENTS) {
  'ngInject';
	
	this.$onInit = () => {
		this.isLoggedIn = UserAuth.isAuthenticated;
		this.user = UserSession.user;
		this.settings = UserSession.settings;
		this.usage = UserSession.usage;

		/**
		 * This property will hold the user's network and
		 * device information when it becomes available; it
		 * remains false until availability.
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
		 * @param  {object} accordion   Accordion instance
		 */
		const accordionReady = $scope.$watch('accordion', accordion => {
			if (accordion) {
				$scope.$applyAsync(() => {
					accordion.expandAll();
				});
				accordionReady();
			}
		});
		/**
		 * Waits for a user to log in successfully; stores user
		 * info and opens accordion sections when login is detected.
		 */
		$scope.$on(AUTH_EVENTS.loginSuccess, (event, user) => {
			this.user = UserSession.user;
			this.settings = UserSession.settings;
			this.usage = UserSession.usage;
			this.updateUsage();
			this.updateSettings();
			this.expandAll();
		});

		this.updateUsage();
	}

	/**
	 * Expands all accordion sections.
	 */
	this.expandAll = () => {
		$scope.accordion.expandAll();
	}
	/**
	 * Collapses all accordion sections.
	 */
	this.collapseAll = () => {
		$scope.accordion.collapseAll();
	}

	/**
	 * Prompts user for login.
	 * @return {Promise} Status of popupWindow
	 */
	this.promptLogin = () => {
		return $popupWindow.login();
	}
	/**
	 * Logs user out directly.
	 */
	this.logout = () => {
    const backdrop = $mdUtil.createBackdrop($scope, "md-dialog-backdrop md-opaque");
    backdrop[0].tabIndex = -1;
    $animate.enter(backdrop, element(document.body), null);
		UserAuth.logout().then(() => {
			$animate.leave(backdrop);
			this.collapseAll();
		});
	}

	/**
	 * Updates the user's setting preferences.
	 */
	this.updateSettings = () => {
		UserSession.settings = this.settings;
	}
	/**
	 * Updates the user's usage preferences; uses the
	 * ConnectionDetails service to convert usage into
	 * a user-friendly description of what it's doing.
	 * - Updates UserSession with current OR incoming usage
	 * - Uses `calculateUsageLevel()` to tally usage stats
	 * - Retrieves array of labels from `getLabelsFromTally()`
	 * @param  {[object]} usage Optional data override
	 */
	this.updateUsage = usage => {
		UserSession.usage = usage || this.usage;
		ConnectionDetails.calculateUsageLevel(UserSession.usage).then(usageLevelTally => {
			this.usageLevel = ConnectionDetails.getLabelsFromTally(usageLevelTally);
		});
	}

	/**
	 * User-activated function for auto-optimizing usage
	 * level using the ConnectionDetails service.
	 * - Sets loading animation during detection
	 * - Fetches connection information with `detect()`
	 * - Stores returned connection information
	 * - Sets optimized usage settings with `optimize()`
	 */
	this.detectConnection = () => {
		if (this.usage.auto.val) {
			this.connection = { loading: true };
			ConnectionDetails.detect().then(connection => {
				this.connection = connection;
				this.usage = ConnectionDetails.optimize(connection);
				this.updateUsage();
			});
		}
	}
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
