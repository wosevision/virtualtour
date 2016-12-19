class UserSession {
	constructor($http, $popupWindow, USER_ROLES, USER_DEFAULTS) {
	  'ngInject';
	  this.$http = $http;
	  this.$popupWindow = $popupWindow;
		this.USER_ROLES = USER_ROLES;
		this.USER_DEFAULTS = USER_DEFAULTS;
	}
	create(user) {
		this.user = user;
		this.userId = user._id;
		this.roles = [];

		const { isAdmin, isEditor, isContributor } = user;
		(isAdmin) && this.roles.push(this.USER_ROLES.admin);
		(isEditor) && this.roles.push(this.USER_ROLES.editor);
		(isContributor) && this.roles.push(this.USER_ROLES.Contributor);
	}
	save() {
		this.$http.post('/user/save', this.user).then(user => {
			this.$popupWindow.toast('primary', {
	    	message: 'User settings updated!',
	    	action: 'Dismiss'
	    })
		});
	}
	destroy() {
		this.user = null;
		this.roles = null;
		this.userId = null;
	}
	get settings() {
	  	Object.keys(this.user.settings).map(key => {
	  		this.USER_DEFAULTS.settings[key].val = this.user.settings[key];
		  });
		  return this.USER_DEFAULTS.settings;
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
	  		this.USER_DEFAULTS.usage[key].val = this.user.usage[key];
		  });
		  return this.USER_DEFAULTS.usage;
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