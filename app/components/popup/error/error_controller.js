function ErrorCtrl($scope, $state, $sce, $window, $mdSidenav, $mdDialog, ERROR_SUGGESTIONS) {
	'ngInject';

	this.suggestions = [];

	if (this.suggest && this.suggest.length) {
		this.suggest.forEach(index => {
			this.suggestions.push(ERROR_SUGGESTIONS[index]);
		})
	}

	$scope.closeDialog = () => {
		$state.reload();
		$mdDialog.hide();
	}

	$scope.goToSettings = () => {
		$mdDialog.hide();
		$state.go('settings');
		$mdSidenav('right').open();
	}

	$scope.refreshApp = () => {
		$window.location.reload();
	}

	$scope.stopProp = $event => {
		$event.stopPropagation();
	}

}

export default {
  name: 'ErrorCtrl',
  fn: ErrorCtrl
};
