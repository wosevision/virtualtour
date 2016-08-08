function SettingsCtrl($scope, $rootScope, SettingsFactory) {
  'ngInject';
	const s = $scope;

	s.syncSettings = function () {
		 SettingsFactory.appSettings.set('_USER', $rootScope.appSettings.USER);
	}
	//s.userSettings = $rootScope.appSettings._USER;
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
