function SettingsCtrl($popupWindow, UserAuth, UserSession) {
  'ngInject';

	this.user = UserSession.user;
	this.settings = UserSession.settings;
	this.usage = UserSession.usage;

	this.syncUser = () => {
		UserSession.settings = this.settings;
	}
	this.syncData = () => {
		UserSession.usage = this.usage;
	}

	this.promptLogin = () => {
		return $popupWindow.login();
	}
	this.logout = () => {
		UserAuth.logout();
	}
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
