import { isNumber } from 'angular';

const SPEED_HI = 50,
			SPEED_WF = 8,
			SPEED_3G = 2;

class ConnectionDetails {
	constructor($rootScope, $http, $q, UserSession, USER_DEFAULTS) {
	  'ngInject';
	  this.$rootScope = $rootScope;
		this.$http = $http;
		this.$q = $q;

		this.usage = UserSession.usage;
		this.profiles = USER_DEFAULTS.profiles;
	}
	detect() {
	  return this.$http.get('/user/connection').then(connection => {
	  	this.connection = connection;
	  	return connection;
	  });
	}
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
	 *   ...
	 * }
	 * @return {Promise} Promise representing final levels
	 */
	calculateUsageLevel() {
		const tally = [0, 0, 0], // [imageQual, loadTime, dataUse] / 0=low, 10=high
	  			deferred = this.$q.defer(),
	  			addToTally = values => {
						tally.forEach((v, index) => {
							tally[index] += values[index];
						});
					};
		this.$rootScope.$applyAsync(() => {
			Object.keys(this.usage).forEach(setting => {
				if (setting !== 'auto') {
					Object.keys(this.usage[setting].levels).forEach(expression => {
						const inRange = this.$rootScope.$eval(`(${ this.usage[setting].val } ${expression})`);
						if (inRange) addToTally(this.usage[setting].levels[expression]);
						if (isNumber(inRange)) deferred.reject('Usage calculation error');
					});
				}
			});
			deferred.resolve(tally);
		});
		return deferred.promise;
	}
	/**
	 * Maps a tally array of numbers into a label
	 * array of human-readable usage level strings.
	 * @param  {array}  tally Array of tallied usage values
	 * @return {string}       Usage description
	 */
	getLabelsFromTally(tally) {
		return tally.map(value => {
			if (value <= 5) return 'Very low';
			if (value > 5 && value <= 10) return 'Low';
			if (value > 10 && value <= 15) return 'Moderate';
			if (value > 15 && value <= 20) return 'High';
			if (value > 20) return 'Very high';
		});
	}
}

export default {
  name: 'ConnectionDetails',
  fn: ConnectionDetails
};
