import { isNumber } from 'angular';

import { CONNECTION_PROFILES } from './connection-profiles.constant';
import { ConnectionProfile } from './connection-profile';

/**
 * Upper limit of "high-speed" connection rating (in Mbps).
 */
const SPEED_HI = 50;

/**
 * Upper limit of "wi-fi" connection rating (in Mbps).
 */
const SPEED_WF = 8;

/**
 * Upper limit of "mobile/3G" connection rating (in Mbps).
 */
const SPEED_3G = 2;

/**
 * This service is responsible for translating user network and device
 * details into a usable format for application settings.
 *
 * It contains methods for detecting details, optimizing settings based
 * on details, calculating general reports of setting levels, and
 * providing human-readable versions of those reports.
 */
export class ConnectionDetailsService {
  profiles: {
    [key: string]: ConnectionProfile
  } = CONNECTION_PROFILES;
  connection: vt.INetworkConnection;
  /**
   * Initializes the service's dependencies. Extracts usage profiles
   * from the `USER_DEFAULTS.profiles` constant and discards other settings.
   */
  constructor(
    private $rootScope, 
    private $http, 
    private $q, 
  ) {
    'ngInject';
  }

  /**
   * Uses Angular's `$http` service to send a request to the server
   * for a connection test. Internally, the server API measures
   * connection speed in the background, and supplies this info back
   * to the app along with device details when it becomes available.
   */
  detect(): Promise<vt.INetworkConnection> {
    return this.$http.get('/user/connection').then(({ data }) => {
      const { network, useragent } = data;
      this.connection = { network, useragent };
      return this.connection;
    });
  }

  /**
   * Determines the best usage profile (from `USER_DEFAULTS.profiles`)
   * to select based on a connection details object (e.g. the result of
   * calling `detect()`).
   */
  optimize(connection: vt.INetworkConnection): ConnectionProfile  {
    const { network, useragent } = connection,
          downloadSpeed = network.speeds.download,
          deviceType = useragent.device.type;

    if (downloadSpeed >= SPEED_HI && !deviceType){
      return this.profiles.desktopFast;
    } else if (downloadSpeed >= SPEED_WF && downloadSpeed < SPEED_HI && !deviceType){
      return this.profiles.desktopSlow;
    } else if (downloadSpeed < SPEED_WF && !deviceType){
      return this.profiles.balanced;
    } else if (downloadSpeed >= SPEED_WF && deviceType  === 'mobile'){
      return this.profiles.mobileWifi;
    } else if (downloadSpeed >= SPEED_3G && deviceType  === 'mobile'){
      return this.profiles.mobile3g;
    } else if (downloadSpeed < SPEED_3G){
      return this.profiles.conserve;
    } else {
      return this.profiles.balanced;
    }
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
   */
  calculateUsageLevel(usage: object): Promise<number[]> {
    let tally: number[] = [0, 0, 0]; // [imageQual, loadTime, dataUse] / 0=low, 10=high
    const deferred = this.$q.defer(),
          addValuesToTally = values => tally.map((v, i) =>  v += values[i]);

    this.$rootScope.$applyAsync(() => {
      Object.keys(usage).forEach(setting => {
        if (setting !== 'auto') {
          tally = Object.keys(usage[setting].levels).reduce((tally, expression) => {
            const inRange = this.$rootScope.$eval(`(${ usage[setting].val } ${expression})`);
            if (inRange) tally = addValuesToTally(usage[setting].levels[expression]);
            if (isNumber(inRange)) deferred.reject('Usage calculation error');
            return tally;
          }, tally);
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
   * @return {Array<String>}        Usage descriptions
   */
  getLabelsFromTally(tally: number[]): string[] {
    return tally.map(value => {
      if (value <= 5) return 'very low';
      if (value > 5 && value <= 10) return 'low';
      if (value > 10 && value <= 15) return 'moderate';
      if (value > 15 && value <= 20) return 'high';
      if (value > 20) return 'very high';
    });
  }
}
