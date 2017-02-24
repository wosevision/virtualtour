function ErrorController($state, $sce, $window, $mdSidenav, $mdDialog, ERROR_SUGGESTIONS) {
	'ngInject';

	this.suggestions = [];

	if (this.suggest && this.suggest.length) {
		this.suggest.forEach(index => {
			this.suggestions.push(ERROR_SUGGESTIONS[index]);
		})
	}

	this.closeDialog = () => {
		$state.reload();
		$mdDialog.hide();
	}

	this.goToSettings = () => {
		$mdDialog.hide();
		$state.go('settings');
		$mdSidenav('right').open();
	}

	this.refreshApp = () => {
		$window.location.reload();
	}

	this.stopProp = $event => {
		$event.stopPropagation();
	}

}

export default ErrorController;
