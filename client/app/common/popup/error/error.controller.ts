import { ERROR_SUGGESTIONS } from './error-suggestions.constant';

export class ErrorController implements ng.IController {
  suggest: number[];
  suggestions: vt.IErrorSuggestion[] = this.suggest.map(i => ERROR_SUGGESTIONS[i]);

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

	closeDialog(): Promise<any> {
		this.$state.reload();
		return this.$mdDialog.hide();
	}

	goToSettings(): Promise<any> {
		this.$mdDialog.hide();
		this.$state.go('settings');
		return this.$mdSidenav('right').open();
	}

	refreshApp() {
		this.$window.location.reload();
	}

	stopProp($event) {
		$event.stopPropagation();
	}
}
