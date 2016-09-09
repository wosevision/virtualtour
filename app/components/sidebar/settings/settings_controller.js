function SettingsCtrl($scope, $rootScope, SettingsFactory) {
  'ngInject';
	const s = $scope;

	s.syncUser = function () {
		 SettingsFactory.appSettings.set('_USER', $rootScope.appSettings.USER);
	}
	s.syncData = function () {
		 SettingsFactory.appSettings.set('_DATA', $rootScope.appSettings.DATA);
	}
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
