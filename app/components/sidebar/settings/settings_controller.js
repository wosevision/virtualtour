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
	this.updateUsage = () => {
		UserSession.usage = this.usage;
		this.calculateUsageLevel().then(usageLevel => {
			this.usageLevel = usageLevel;
		});
	}

	/**
	 * Maps a tally array of numbers into a label
	 * array of human-readable usage level strings.
	 * @param  {array}  tally Array of tallied usage values
	 * @return {string}       Usage description
	 */
	const getLabelsFromTally = tally => tally.map(value => {
		if (value <= 5) return 'Very low';
		if (value > 5 && value <= 10) return 'Low';
		if (value > 10 && value <= 15) return 'Moderate';
		if (value > 15 && value <= 20) return 'High';
		if (value > 20) return 'Very high';
	});
	/**
	 * Tallies up values of usage settings asynchronously
	 * by using `$scope.$eval()` to match applicable usage
	 * level values against their keys (which are keyed by
	 * "condition").
	 * @example
	 * {
	 *   '<= 15': [0, 0, 5],
	 *   ...
	 * }
	 * @return {Promise} Promise representing final levels
	 */
	this.calculateUsageLevel = () => {
		const tally = [0, 0, 0], // [imageQual, loadTime, dataUse] / 0=low, 10=high
	  			deferred = $q.defer(),
	  			addToTally = values => {
						tally.forEach((v, index) => {
							tally[index] += values[index];
						});
					};
		$scope.$applyAsync(() => {
			Object.keys(this.usage).forEach(setting => {
				if (setting !== 'auto') {
					Object.keys(this.usage[setting].levels).forEach(expression => {
						const inRange = $scope.$eval(`(${ this.usage[setting].val } ${expression})`);
						if (inRange) addToTally(this.usage[setting].levels[expression]);
						if (isNumber(inRange)) deferred.reject('Usage calculation error');
					});
				}
			});
			const labels = getLabelsFromTally(tally);
			deferred.resolve(labels);
		});
		return deferred.promise;
	}

	this.detectConnection = () => {
		this.connection = { loading: true };
		ConnectionDetails.then(connection => {
			this.connection = connection;
			console.log(connection);
		});
		this.updateUsage();
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
