class UserSession {
	constructor($http, $popupWindow, SettingsFactory, USER_ROLES, USER_DEFAULTS) {
	  'ngInject';
	  this.$http = $http;
	  this.$popupWindow = $popupWindow;
	  this.SettingsFactory = SettingsFactory;

		this._roles = USER_ROLES;
		this._settings = USER_DEFAULTS.settings;
		this._usage = USER_DEFAULTS.usage;

		this.roles = [];
		this.user = {
			settings: {},
			usage: {}
		};
	}
	create(user) {
		if (user) {
			this.userId = user._id;
			this.user = user;
	
			const { isAdmin, isEditor, isContributor } = user;
			(isAdmin) && this.roles.push(this._roles.admin);
			(isEditor) && this.roles.push(this._roles.editor);
			(isContributor) && this.roles.push(this._roles.Contributor);
	  	console.log('created session from user');
		} else {
			this.user.settings = this.SettingsFactory.get('settings'),
			this.user.usage = this.SettingsFactory.get('usage');
	  	console.log('created session from local defaults');
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
			this.SettingsFactory.set('settings', this.user.settings);
			this.SettingsFactory.set('usage', this.user.usage);
	  	console.log('saved settings to local!');
		}
	}
	destroy() {
		this.user = null;
		this.roles = null;
		this.userId = null;
	}
	get settings() {
	  	Object.keys(this.user.settings).map(key => {
	  		this._settings[key].val = this.user.settings[key];
		  });
		  return this._settings;
	}
	set settings(settings) {
	  if (settings) {
	  	Object.keys(settings).map(key => {
	  		this.user.settings[key] = settings[key].val;
		  });
		  this.save();
		}
	}
	get usage() {
	  	Object.keys(this.user.usage).map(key => {
	  		this._usage[key].val = this.user.usage[key];
		  });
		  return this._usage;
	}
	set usage(usage) {
	  if (usage) {
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