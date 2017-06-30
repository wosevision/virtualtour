import { isDefined, equals } from 'angular';

/**
 * User session management service.
 */
export class UserSessionService {
  _roles;
  _settings;
  _usage;

  roles: string[];

  userId: string;
  user: Partial<vt.ITourUser>;

	constructor(
    private $http: ng.IHttpService, 
    private $rootScope: ng.IRootScopeService, 
    private $popupWindow, 
    private SettingsFactory, 
    private USER_ROLES, 
    private USER_DEFAULTS: vt.ITourUser
  ) {
	  'ngInject';

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
	create(user: Partial<vt.ITourUser>): Promise<vt.ITourUser> {
		this.roles = [];
    console.log('[user-session.service] create');
    return new Promise((resolve, reject) => {
  		if (user) {
  			this.userId = user._id;
  			this.user = user;
  	
  			const { isAdmin, isEditor, isContributor } = user;
  			(isAdmin) && this.roles.push(this._roles.admin);
  			(isEditor) && this.roles.push(this._roles.editor);
  			(isContributor) && this.roles.push(this._roles.Contributor);''
  		} else {
  			/**
  			 * Looks inside SettingsFactory for user data matching the pattern
  			 * defined in USER_DEFAULTS; store in temporary vars.
  			 */
  			const _settings = this.SettingsFactory.get('settings'),
  						_usage = this.SettingsFactory.get('usage');

  			/**
  			 * Init a 'blank' user with the required settings properties to
  			 * avoid assignment errors (i.e. `this.user.settings[key] = ...`)
  			 */
  			this.user = {
  				settings: {},
  				usage: {}
  			}

  			// Use the UserSession's getter/setters to merge the found setting
  			// values into USER_DEFAULTS via the user model.
  			this.settings = _settings && !equals(_settings, {}) ? _settings : this._settings;
  			this.usage = _usage && !equals(_usage, {}) ? _usage : this._usage;

  		}
      if (!this.user || !this.user.settings || !this.user.usage) {
        reject('issue initializing user session');
      }
      console.log('[user-session.service] create', this.user);
      resolve(this.user);
    });
	}
	/**
	 * Checks the `userId` property to verify whether settings should
	 * save to a logged in user; if not, saves them to localStorage using
	 * the `SettingsFactory`.
	 */
	save() {
		if (this.userId) {
			this.$http.post('/user/save', this.user).then(user => {
				this.$popupWindow.toast('primary', {
		    	message: 'User settings updated!',
		    	action: 'Dismiss'
		    });
        console.log('[user-session.service] save', user);
			});
		} else {
			this.SettingsFactory.set('settings', this.settings);
			this.SettingsFactory.set('usage', this.usage);
      console.log('[user-session.service] save', this.user);
		}
	}
	/**
	 * Removes user session data and nulls out roles/ID.
	 */
	destroy(): Promise<vt.ITourUser> {
    return new Promise(resolve => {
      this.user = {
        settings: {},
        usage: {}
      };
      this.roles = null;
      this.userId = null;
      console.log('[user-session.service] destroy', this.user);
      resolve(this.user);
    });
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
	 * @param  {Object} [settings/usage] Incoming app settings to merge into user
	 * @return {Object} 								 Merged app settings built from user
	 */
	get settings(): vt.ITourUserSettings {
		if (this.user.settings) {
	  	Object.keys(this.user.settings).map(key => {
	  		if (this._settings[key]) this._settings[key].val = this.user.settings[key];
		  });
		  return this._settings;
		}
	}
	set settings(settings: vt.ITourUserSettings) {
	  if (isDefined(settings)) {
	  	Object.keys(settings).map(key => {
	  		if (this._settings[key]) this.user.settings[key] = settings[key].val;
		  });
		  this.save();
		}
	}
	get usage(): vt.ITourUserUsage {
		if (this.user.usage) {
	  	Object.keys(this.user.usage).map(key => {
	  		if (this._usage[key]) this._usage[key].val = this.user.usage[key];
		  });
		  return this._usage;
		}
	}
	set usage(usage: vt.ITourUserUsage) {
	  if (isDefined(usage)) {
	  	Object.keys(usage).map(key => {
	  		if (this._usage[key]) this.user.usage[key] = usage[key].val;
		  });
		  this.save();
		}
	}
}