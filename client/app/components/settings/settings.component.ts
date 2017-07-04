import { element } from 'angular';
import {
  Component,
  OnInit,
  Inject
} from 'ng-metadata/core';

import { ConnectionDetailsService } from './connection/connection-details.service';
import { UserSessionService } from '../../common/user/user-session.service';
import { UserAuthService } from '../../common/user/user-auth.service';
import { AUTH_EVENTS } from '../../common/user/user-defaults.constant';

import template from './settings.html';

@Component({
  selector: 'user-settings',
  template
})
/**
 * The settings controller provides a high-level interface to
 * the app's user preferences and data usage settings, login/logout
 * functions, and a set of automatic usage detection functions.
 */
export class SettingsComponent implements ng.IController, OnInit {
  isLoggedIn: Function;
  user: Partial<vt.ITourUser>;
  settings;
  usage;
  connection: boolean | { loading: boolean } | vt.INetworkConnection;
  usageLevel: string[];
  
  constructor(
    private UserAuthService: UserAuthService, 
    private UserSessionService: UserSessionService, 
    private ConnectionDetailsService: ConnectionDetailsService,
    @Inject('$scope') private $scope, 
    @Inject('$animate') private $animate, 
    @Inject('$mdUtil') private $mdUtil, 
    @Inject('$popupWindow') private $popupWindow,
  ) { }
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
  ngOnInit() {
    this.isLoggedIn = this.UserAuthService.isAuthenticated;
    this.user = this.UserSessionService.user;
    this.settings = this.UserSessionService.settings;
    this.usage = this.UserSessionService.usage;

    /**
     * This property will hold the user's network and
     * device information when it becomes available; it
     * remains false until availability.
     *
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
     */
    const accordionReady = this.$scope.$watch('accordion', accordion => {
      if (accordion) {
        this.$scope.$applyAsync(() => {
          this.isLoggedIn() && accordion.expandAll();
        });
        accordionReady();
      }
    });

    this.$scope.$on(AUTH_EVENTS.loginSuccess, this.loadUserAfterLogin.bind(this) );
    
    this.getUsageLevel();

    console.info('[settings.component] ngOnInit', this)
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
   */
  promptLogin(): Promise<any> {
    return this.$popupWindow.login();
  }
  /**
   * Logs user out directly with `UserAuthService.logout()`.
   */
  logout() {
    const backdrop = this.$mdUtil.createBackdrop(this.$scope, "md-dialog-backdrop md-opaque");
    backdrop[0].tabIndex = -1;
    this.$animate.enter(backdrop, element(document.body), null);
    this.UserAuthService.logout().then(() => {
      this.$animate.leave(backdrop);
      this.collapseAll();
    });
  }

  /**
   * Stores user info and opens accordion sections when login is detected.
   */
  loadUserAfterLogin(event: Event, user: vt.ITourUser) {
    this.user = this.UserSessionService.user;
    this.settings = this.UserSessionService.settings;
    this.usage = this.UserSessionService.usage;
    this.updateUsage();
    this.updateSettings();
    this.expandAll();
  }

  /**
   * Updates the user's setting preferences.
   */
  updateSettings() {
    this.UserSessionService.settings = this.settings;
  }
  /**
   * Updates the user's usage preferences and usage level description text.
   */
  updateUsage(usage = null) {
    this.UserSessionService.usage = usage || this.usage;
    this.getUsageLevel()
      .then(usageLevel => this.usageLevel = usageLevel);
  }
  /**
   * Uses the `ConnectionDetailsService` service to convert the current
   * session's usage preferences into a user-friendly description
   * of what the preferences' effects will be.
   * - Grabs `UserSessionService.usage` details
   * - Uses `ConnectionDetailsService.calculateUsageLevel()` to tally usage stats from details
   * - Passes resulting tally to `ConnectionDetailsService.getLabelsFromTally()`
   * - Assigns resulting descriptions to controller
   */
  getUsageLevel(): Promise<any> {
    return this.ConnectionDetailsService.calculateUsageLevel(this.UserSessionService.usage).then(usageLevelTally => {
      return this.ConnectionDetailsService.getLabelsFromTally(usageLevelTally);
    });
  }

  /**
   * User-activated function for auto-optimizing usage
   * level using the `ConnectionDetailsService`.
   * - Sets loading animation during detection
   * - Fetches connection information with `detect()`
   * - Stores returned connection information
   * - Sets optimized usage settings with `optimize()`
   */
  detectConnection(): Promise<vt.INetworkConnection> {
    if (this.usage.auto.val) {
      this.connection = { loading: true };
      return this.ConnectionDetailsService.detect().then((connection: vt.INetworkConnection) => {
        this.connection = connection;
        this.usage = this.ConnectionDetailsService.optimize(connection);
        this.updateUsage();
        return connection;
      });
    }
  }
}
