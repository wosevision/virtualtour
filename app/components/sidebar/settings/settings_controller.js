function SettingsCtrl($rootScope, $popupWindow, UserAuth, UserSession, SettingsFactory) {
  'ngInject';
	this.syncUser = () => {
		if (UserSession.userId) {
			UserSession.settings = $rootScope.appSettings.settings;
		} else {
			SettingsFactory.set('settings', $rootScope.appSettings.settings);
		}
	}
	this.syncData = () => {
		if (UserSession.userId) {
			UserSession.usage = $rootScope.appSettings.usage;
		} else {
			SettingsFactory.set('usage', $rootScope.appSettings.usage);
		}
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
