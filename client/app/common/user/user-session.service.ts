import { isDefined, equals } from 'angular';
import { Inject, Injectable } from 'ng-metadata/core';

import { SettingsService } from '../../components/settings/settings.service';
import {
  USER_DEFAULTS,
  USER_ROLES,
  AUTH_EVENTS
} from './user-defaults.constant';

@Injectable()
/**
 * User session management service.
 */
export class UserSessionService {
  _roles = USER_ROLES;
  _settings = USER_DEFAULTS.settings;
  _usage = USER_DEFAULTS.usage;

  roles: string[];

  userId: string;
  user: Partial<vt.ITourUser> = {};

	constructor(
    private SettingsService: SettingsService, 
    @Inject('$http') private $http: ng.IHttpService, 
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService, 
    @Inject('$popupWindow') private $popupWindow,
  ) { }
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
  			(isContributor) && this.roles.push(this._roles.contributor);''
  		} else {
  			/**
  			 * Looks inside SettingsService for user data matching the pattern
  			 * defined in USER_DEFAULTS; store in temporary vars.
  			 */
  			const _settings = this.SettingsService.get('settings'),
  						_usage = this.SettingsService.get('usage');

  			/**
  			 * Init a 'blank' user with the required settings properties to
  			 * avoid assignment errors (i.e. `this.user.settings[key] = ...`)
  			 */
  			this.user = {
  				settings: <vt.ITourUserSettings>{},
  				usage: <vt.ITourUserUsage>{}
  			}

  			// Use the UserSession's getter/setters to merge the found setting
  			// values into USER_DEFAULTS via the user model.
  			this.user.settings = _settings && !equals(_settings, {}) ? _settings : this._settings;
  			this.user.usage = _usage && !equals(_usage, {}) ? _usage : this._usage;

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
	 * the `SettingsService`.
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
			this.SettingsService.set('settings', this.settings);
			this.SettingsService.set('usage', this.usage);
      console.log('[user-session.service] save', this.user);
		}
	}
	/**
	 * Removes user session data and nulls out roles/ID.
	 */
	destroy(): Promise<vt.ITourUser> {
    return new Promise(resolve => {
      this.user = {
        settings: <vt.ITourUserSettings>{},
        usage: <vt.ITourUserUsage>{}
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