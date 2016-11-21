function SettingsCtrl($scope, $rootScope, SettingsFactory) {
  'ngInject';
	const s = $scope;

	s.syncUser = function () {
		 SettingsFactory.set('USER', $rootScope.appSettings.USER);
	}
	s.syncData = function () {
		 SettingsFactory.set('DATA', $rootScope.appSettings.DATA);
	}
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
