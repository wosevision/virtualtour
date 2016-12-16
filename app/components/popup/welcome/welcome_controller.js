function DialogCtrl($rootScope, $scope, $mdDialog, nzTour, SettingsFactory, TOUR_STEPS) {
  'ngInject';
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  $scope.startTour = function() {
    $mdDialog.hide('tour');
  	nzTour.start(TOUR_STEPS);
  }
  $scope.syncUser = () => {
		SettingsFactory.set('USER', $rootScope.appSettings.USER);
  }
}

export default {
  name: 'DialogCtrl',
  fn: DialogCtrl
};
