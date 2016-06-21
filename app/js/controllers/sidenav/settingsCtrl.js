/*@ngInject*/
function SettingsCtrl($scope, $rootScope, Datastore) {
	const s = $scope;

	s.syncSettings = function () {
		 Datastore.appSettings.set('_USER', $rootScope.appSettings._USER);
	}
	//s.userSettings = $rootScope.appSettings._USER;
}

export default {
  name: 'SettingsCtrl',
  fn: SettingsCtrl
};
