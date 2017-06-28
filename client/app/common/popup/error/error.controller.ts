export class ErrorController {
  suggest: number[];
  suggestions: vt.IErrorSuggestion[] = this.suggest.map(i => this.ERROR_SUGGESTIONS[i]);

  constructor(
    private $sce: ng.ISCEService,
    private $window: ng.IWindowService,
    private $state: ng.ui.IStateService,
    private $mdSidenav,
    private $mdDialog,
    private ERROR_SUGGESTIONS: vt.IErrorSuggestion[],
  ) {
  	'ngInject';
  }

	closeDialog() {
		this.$state.reload();
		this.$mdDialog.hide();
	}

	goToSettings() {
		this.$mdDialog.hide();
		this.$state.go('settings');
		this.$mdSidenav('right').open();
	}

	refreshApp() {
		this.$window.location.reload();
	}

	stopProp($event) {
		$event.stopPropagation();
	}
}
