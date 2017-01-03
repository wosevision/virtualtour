import { element } from 'angular';

function SettingsCtrl(
	$scope, $animate, $mdUtil, $popupWindow,
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
    const backdrop = $mdUtil.createBackdrop($scope, "md-dialog-backdrop md-opaque");
    backdrop[0].tabIndex = -1;
    $animate.enter(backdrop, element(document.body), null);
		UserAuth.logout().then(() => {
			$animate.leave(backdrop);
			this.collapseAll();
		});
	}

	this.expandAll = () => {
		$scope.accordion.expandAll();
	}
	this.collapseAll = () => {
		$scope.accordion.collapseAll();
	}

	const unwatch = $scope.$watch('accordion', accordion => {
		if (accordion) {
			console.log(accordion);
			$scope.$applyAsync(() => {
				accordion.expandAll();
			});
			unwatch();
		}
	});

	$scope.$on(AUTH_EVENTS.loginSuccess, (event, user) => {
		this.user = user;
		this.expandAll();
	});
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
