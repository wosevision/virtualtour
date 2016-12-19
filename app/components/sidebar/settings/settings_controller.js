function SettingsCtrl($rootScope, $popupWindow, UserAuth, UserSession, SettingsFactory) {
  'ngInject';
	this.syncUser = () => {
		if (UserSession.userId) {
			UserSession.settings = $rootScope.appSettings.USER;
		} else {
			SettingsFactory.set('USER', $rootScope.appSettings.USER);
		}
	}
	this.syncData = () => {
		if (UserSession.userId) {
			UserSession.usage = $rootScope.appSettings.DATA;
		} else {
			SettingsFactory.set('DATA', $rootScope.appSettings.DATA);
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
