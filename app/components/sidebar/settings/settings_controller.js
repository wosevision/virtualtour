function SettingsCtrl($scope, $rootScope, Settings) {
  'ngInject';
	const s = $scope;

	s.syncSettings = function () {
		 Settings.appSettings.set('_USER', $rootScope.appSettings._USER);
	}
	//s.userSettings = $rootScope.appSettings._USER;
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
