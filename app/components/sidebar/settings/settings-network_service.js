import { isNumber } from 'angular';

/**
 * Upper limit of "high-speed" connection rating (in Mbps).
 * @memberof ConnectionDetails
 * @type {Number}
 */
const SPEED_HI = 50;

/**
 * Upper limit of "wi-fi" connection rating (in Mbps).
 * @memberof ConnectionDetails
 * @type {Number}
 */
const SPEED_WF = 8;

/**
 * Upper limit of "mobile/3G" connection rating (in Mbps).
 * @memberof ConnectionDetails
 * @type {Number}
 */
const SPEED_3G = 2;

/**
 * This service is responsible for translating user network and device
 * details into a usable format for application settings.
 *
 * It contains methods for detecting details, optimizing settings based
 * on details, calculating general reports of setting levels, and
 * providing human-readable versions of those reports.
 * 
 * @param  {Object} $rootScope    The root of the app scopes
 * @param  {Object} $http         Angular's http service
 * @param  {Object} $q            Angular's promise builder
 * @param  {Object} USER_DEFAULTS Constant for default settings
 */
class ConnectionDetails {
	/**
	 * Initializes the service's dependencies. Extracts usage profiles
	 * from the `USER_DEFAULTS.profiles` constant and discards other settings.
	 */
	constructor($rootScope, $http, $q, USER_DEFAULTS) {
	  'ngInject';
	  this.$rootScope = $rootScope;
		this.$http = $http;
		this.$q = $q;

		this.profiles = USER_DEFAULTS.profiles;
	}

	/**
	 * Uses Angular's `$http` service to send a request to the server
	 * for a connection test. Internally, the server API measures
	 * connection speed in the background, and supplies this info back
	 * to the app along with device details when it becomes available.
	 * 
	 * @return {Promise} Promise that will resolve to connection details
	 */
	detect() {
	  return this.$http.get('/user/connection').then(connection => {
	  	this.connection = connection;
	  	return connection;
	  });
	}

	/**
	 * Determines the best usage profile (from `USER_DEFAULTS.profiles`)
	 * to select based on a connection details object (e.g. the result of
	 * calling `detect()`).
	 * @param  {Object} connection Incoming connection details object
	 * @return {Object}            The chosen optimal settings profile
	 */
	optimize(connection) {
		const { network, useragent } = connection.data,
					downloadSpeed = network.speeds.download,
					deviceType = useragent.device.type;

		if (downloadSpeed >= SPEED_HI && !deviceType)
			return this.profiles.desktopFast;
		if (downloadSpeed >= SPEED_WF && downloadSpeed < SPEED_HI && !deviceType)
			return this.profiles.desktopSlow;
		if (downloadSpeed < SPEED_WF && !deviceType)
			return this.profiles.balanced;
		if (downloadSpeed >= SPEED_WF && deviceType  === 'mobile')
			return this.profiles.mobileWifi;
		if (downloadSpeed >= SPEED_3G && deviceType  === 'mobile')
			return this.profiles.mobile3g;
		if (downloadSpeed < SPEED_3G)
			return this.profiles.conserve;
		// default return
		return this.profiles.balanced;
	}

	/**
	 * Tallies up values of usage settings asynchronously
	 * by using `$scope.$eval()` to match applicable usage
	 * level values against their keys (which are keyed by
	 * "condition").
	 * @example
	 * {
	 *   '<= 15': [0, 0, 5],
	 *   '== 0': [...]
	 * }
	 * @param	 {Object}	usage Incoming usage preference object
	 * @return {Promise}			Promise representing final levels
	 */
	calculateUsageLevel(usage) {
		const tally = [0, 0, 0], // [imageQual, loadTime, dataUse] / 0=low, 10=high
	  			deferred = this.$q.defer(),
	  			addToTally = values => {
						tally.forEach((v, index) => {
							tally[index] += values[index];
						});
					};
		this.$rootScope.$applyAsync(() => {
			Object.keys(usage).forEach(setting => {
				if (setting !== 'auto') {
					Object.keys(usage[setting].levels).forEach(expression => {
						const inRange = this.$rootScope.$eval(`(${ usage[setting].val } ${expression})`);
						if (inRange) addToTally(usage[setting].levels[expression]);
						if (isNumber(inRange)) deferred.reject('Usage calculation error');
					});
				}
			});
			deferred.resolve(tally);
		});
		return deferred.promise;
	}
	// TODO(PERF): CLEAN UP THIS FUNCTION; TOO MANY NESTED CLOSURES

	/**
	 * Maps a tally array of numbers into a label
	 * array of human-readable usage level strings.
	 * @param  {Array<Number>}  tally Array of tallied usage values
	 * @return {Array<String>}       	Usage descriptions
	 */
	getLabelsFromTally(tally) {
		return tally.map(value => {
			if (value <= 5) return 'very low';
			if (value > 5 && value <= 10) return 'low';
			if (value > 10 && value <= 15) return 'moderate';
			if (value > 15 && value <= 20) return 'high';
			if (value > 20) return 'very high';
		});
	}
}

export default {
  name: 'ConnectionDetails',
  fn: ConnectionDetails
};
