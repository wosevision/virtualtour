function DialogCtrl($scope, $mdDialog, nzTour, TOUR_STEPS) {
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
}

export default {
  name: 'DialogCtrl',
  fn: DialogCtrl
};
