import { isDefined, equals } from 'angular';

class UserSession {
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
			 * Look inside SettingsFactory for user data matching the pattern
			 * defined in USER_DEFAULTS, i.e. if found, it returns an object
			 * in the form of 
			 * {
			 *   toolbarOpen: {
			 *     val: false,
			 *     label: 'Toolbar open',
			 *     ...
			 *   }
			 * }
			 * instead of the db user's model
			 * { toolbarOpen: false }
			 */
			const _settings = this.SettingsFactory.get('thurs'),
						_usage = this.SettingsFactory.get('weds');

			this.user = {
				settings: {},
				usage: {}
			}

			/**
			 * Use this instance's getter/setters to merge the found setting
			 * values into USER_DEFAULTS via the user model
			 */
			this.settings = _settings && !equals(_settings, {}) ? _settings : this._settings;
			this.usage = _usage && !equals(_usage, {}) ? _usage : this._usage;

	  	console.log('created session from local defaults', _settings);
		}
		return this.user;
	}
	save() {
		if (this.userId) {
			this.$http.post('/user/save', this.user).then(user => {
				this.$popupWindow.toast('primary', {
		    	message: 'User settings updated!',
		    	action: 'Dismiss'
		    });

		  	console.log('saved settings to user!');
			});
		} else {
			this.SettingsFactory.set('thurs', this.settings);
			this.SettingsFactory.set('weds', this.usage);

	  	console.log('saved settings to local!', this.user);
		}
	}
	destroy() {
		this.user = {
			settings: {},
			usage: {}
		};
		this.roles = null;
		this.userId = null;

  	console.log('user session destroyed');
	}
	get settings() {
		if (this.user.settings) {
	  	Object.keys(this.user.settings).map(key => {
	  		this._settings[key].val = this.user.settings[key];
		  });
		}
	  return this._settings;
	}
	set settings(settings) {
	  if (isDefined(settings)) {
	  	Object.keys(settings).map(key => {
	  		this.user.settings[key] = settings[key].val;
		  });
		  this.save();
		}
	}
	get usage() {
		if (this.user.usage) {
	  	Object.keys(this.user.usage).map(key => {
	  		this._usage[key].val = this.user.usage[key];
		  });
		}
	  return this._usage;
	}
	set usage(usage) {
	  if (isDefined(usage)) {
	  	Object.keys(usage).map(key => {
	  		this.user.usage[key] = usage[key].val;
		  });
		  this.save();
		}
	}
}

export default {
  name: 'UserSession',
  fn: UserSession
};