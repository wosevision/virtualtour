function DialogCtrl($scope, $mdDialog, UserSession, nzTour, TOUR_STEPS) {
  'ngInject';
  this.hide = function() {
    $mdDialog.hide();
  };
  this.cancel = function() {
    $mdDialog.cancel();
  };
  this.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  this.startTour = function() {
    $mdDialog.hide('tour');
  	nzTour.start(TOUR_STEPS);
  }
  this.syncSettings = () => {
  	const currentSettings = UserSession.settings;
  	currentSettings.showWelcome.val = this.showWelcome;
  	UserSession.settings = currentSettings;
  }
}

export default {
  name: 'DialogCtrl',
  fn: DialogCtrl
};
