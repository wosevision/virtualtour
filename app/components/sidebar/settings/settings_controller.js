function SettingsCtrl(
	$scope, $popupWindow,
	UserAuth, UserSession,
	AUTH_EVENTS) {
  'ngInject';
	
	this.isLoggedIn = UserAuth.isAuthenticated;
	this.user = UserSession.user;
	this.settings = UserSession.settings;
	this.usage = UserSession.usage;

	this.updateSettings = () => {
		UserSession.settings = this.settings;
	}
	this.updateUsage = () => {
		UserSession.usage = this.usage;
	}
	this.promptLogin = () => {
		return $popupWindow.login();
	}
	this.logout = () => {
		UserAuth.logout();
	}

	$scope.$on(AUTH_EVENTS.loginSuccess, (event, user) => {
		this.user = user;
	});
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
