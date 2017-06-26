import { element } from 'angular';

import template from './settings.html';

export const SettingsComponent = {
  bindings: {},
  template,
	/**
	 * The settings controller provides a high-level interface to
	 * the app's user preferences and data usage settings, login/logout
	 * functions, and a set of automatic usage detection functions.
	 */
  controller: class SettingsController {
  	isLoggedIn: Function;
		user: User;
		settings;
		usage;
		connection: boolean | { loading: boolean } | Connection;
		usageLevel: string[];
		constructor(
			private $scope, 
			private $animate, 
			private $mdUtil, 
			private $popupWindow,
			private UserAuth, 
			private UserSession, 
			private ConnectionDetails,
			private AUTH_EVENTS,
		) {
			'ngInject';
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
		 */
		promptLogin(): ng.IPromise<any> {
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
		loadUserAfterLogin(event: Event, user: User) {
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
		 */
		updateUsage(usage = null) {
			this.UserSession.usage = usage || this.usage;
			this.getUsageLevel()
				.then(usageLevel => this.usageLevel = usageLevel);
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
		getUsageLevel(): Promise<any> {
			return this.ConnectionDetails.calculateUsageLevel(this.UserSession.usage).then(usageLevelTally => {
				return this.ConnectionDetails.getLabelsFromTally(usageLevelTally);
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
		detectConnection(): ng.IPromise<Connection> {
			if (this.usage.auto.val) {
				this.connection = { loading: true };
				return this.ConnectionDetails.detect().then((connection: Connection) => {
					this.connection = connection;
					this.usage = this.ConnectionDetails.optimize(connection);
					this.updateUsage();
				});
			}
		}
	}
};
