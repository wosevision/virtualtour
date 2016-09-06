function DialogCtrl($scope, $mdDialog, nzTour) {
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
}

export default {
  name: 'DialogCtrl',
  fn: DialogCtrl
};
