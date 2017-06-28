import { isDefined, equals } from 'angular';

/**
 * User session management service.
 */
class UserSessionService {
	constructor($http, $popupWindow, SettingsFactory, USER_ROLES, USER_DEFAULTS) {
	  'ngInject';
	  this.$http = $http;
	  this.$popupWindow = $popupWindow;
	  this.SettingsFactory = SettingsFactory;

		this._roles = USER_ROLES;
		this._settings = USER_DEFAULTS.settings;
		this._usage = USER_DEFAULTS.usage;

		this.user = {};
	}
	/**
	 * This function creates a new user session, which is
	 * necessary to store application settings regardless of
	 * whether there is a "real" user logged in. If there is
	 * a user, the UserSession service will:
	 * 
	 * - set the `userId` property to indicate an active user
	 * - read user roles based on their boolean values on user
	 * - push role strings into a `roles` property on UserSession
	 * 
	 * If not, the service checks for local settings and inits
	 * a "blank" user with those settings (or the app defaults).
	 * 
	 * @param  {Object} user DB user object to use for session
	 * @return {Object}      Fully-formed user object after settings
	 */
	create(user) {
		this.roles = [];
		if (user) {
			this.userId = user._id;
			this.user = user;
	
			const { isAdmin, isEditor, isContributor } = user;
			(isAdmin) && this.roles.push(this._roles.admin);
			(isEditor) && this.roles.push(this._roles.editor);
			(isContributor) && this.roles.push(this._roles.Contributor);

	  	console.log('created session from user');
		} else {
			/**
			 * Looks inside SettingsFactory for user data matching the pattern
			 * defined in USER_DEFAULTS; store in temporary vars.
			 *
			 * @alias _settings/_usage
			 * @memberof UserSession
			 */
			const _settings = this.SettingsFactory.get('settings'),
						_usage = this.SettingsFactory.get('usage');

			/**
			 * Init a 'blank' user with the required settings properties to
			 * avoid assignment errors (i.e. `this.user.settings[key] = ...`)
			 * 
			 * @memberof UserSession
			 * @type {Object}
			 * @prop {Object} settings The user's unparsed settings
			 * @prop {Object} usage 	 The user's unparsed usage prefs
			 */
			this.user = {
				settings: {},
				usage: {}
			}

			// Use the UserSession's getter/setters to merge the found setting
			// values into USER_DEFAULTS via the user model.
			this.settings = _settings && !equals(_settings, {}) ? _settings : this._settings;
			this.usage = _usage && !equals(_usage, {}) ? _usage : this._usage;

	  	console.log('created session from local defaults', _settings);
		}
		return this.user;
	}
	/**
	 * Checks the `userId` property to verify whether settings should
	 * save to a logged in user; if not, saves them to localStorage using
	 * the `SettingsFactory`.
	 */
	save() {
  	console.log('saving settings to user...');
		if (this.userId) {
			this.$http.post('/user/save', this.user).then(user => {
				this.$popupWindow.toast('primary', {
		    	message: 'User settings updated!',
		    	action: 'Dismiss'
		    });
		  	console.log('saved settings to user!');
			});
		} else {
			this.SettingsFactory.set('settings', this.settings);
			this.SettingsFactory.set('usage', this.usage);

	  	console.log('saved settings to local!', this.user);
		}
	}
	/**
	 * Removes user session data and nulls out roles/ID.
	 */
	destroy() {
		this.user = {
			settings: {},
			usage: {}
		};
		this.roles = null;
		this.userId = null;

  	console.log('user session destroyed');
	}
	/**
	 * Getter/setter pairs for merging user setting objects from
	 * the DB the form of:
	 * 
	 * `{ toolbarOpen: false }`
	 * 
	 * into fully-qualified app-level settings objects that look like:
	 * 
	 * ```
	 * {
	 *   toolbarOpen: {
	 *     val: false,
	 *     label: 'Toolbar open',
	 *     ...
	 *   }
	 * }
	 * ```
	 *
	 * or vice-versa for setting the user object based on app prefs.
	 *
	 * @alias settings/usage
	 * @param  {Object} [settings/usage] Incoming app settings to merge into user
	 * @return {Object} 								 Merged app settings built from user
	 */
	get settings() {
		if (this.user.settings) {
	  	Object.keys(this.user.settings).map(key => {
	  		if (this._settings[key]) this._settings[key].val = this.user.settings[key];
		  });
		  return this._settings;
		}
	}
	set settings(settings) {
	  if (isDefined(settings)) {
	  	Object.keys(settings).map(key => {
	  		if (this._settings[key]) this.user.settings[key] = settings[key].val;
		  });
		  this.save();
		}
	}
	get usage() {
		if (this.user.usage) {
	  	Object.keys(this.user.usage).map(key => {
	  		if (this._usage[key]) this._usage[key].val = this.user.usage[key];
		  });
		  return this._usage;
		}
	}
	set usage(usage) {
	  if (isDefined(usage)) {
	  	Object.keys(usage).map(key => {
	  		if (this._usage[key]) this.user.usage[key] = usage[key].val;
		  });
		  this.save();
		}
	}
}

export default UserSessionService;