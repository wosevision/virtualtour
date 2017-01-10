import { element, isNumber } from 'angular';

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
	}

	this.updateSettings = () => {
		UserSession.settings = this.settings;
	}
	this.updateUsage = usage => {
		UserSession.usage = usage || this.usage;
		ConnectionDetails.calculateUsageLevel().then(usageLevelTally => {
			this.usageLevel = ConnectionDetails.getLabelsFromTally(usageLevelTally);
		});
	}

	this.detectConnection = () => {
		this.connection = { loading: true };
		ConnectionDetails.detect().then(connection => {
			this.connection = connection;
			this.usage = ConnectionDetails.optimize(connection);
			this.updateUsage();
		});
	}

	const accordionReady = $scope.$watch('accordion', accordion => {
		if (accordion) {
			$scope.$applyAsync(() => {
				accordion.expandAll();
			});
			accordionReady();
		}
	});

	this.expandAll = () => {
		$scope.accordion.expandAll();
	}
	this.collapseAll = () => {
		$scope.accordion.collapseAll();
	}

	$scope.$on(AUTH_EVENTS.loginSuccess, (event, user) => {
		this.user = user;
		this.expandAll();
	});

	this.promptLogin = () => {
		return $popupWindow.login();
	}
	this.logout = () => {
    const backdrop = $mdUtil.createBackdrop($scope, "md-dialog-backdrop md-opaque");
    backdrop[0].tabIndex = -1;
    $animate.enter(backdrop, element(document.body), null);
		UserAuth.logout().then(() => {
			$animate.leave(backdrop);
			this.collapseAll();
		});
	}
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
