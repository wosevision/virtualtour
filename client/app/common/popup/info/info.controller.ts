export class InfoController implements ng.IController {
	constructor(
    private $state: ng.ui.IStateService,
    private $sce: ng.ISCEService,
    private $mdSidenav,
    private $mdDialog
  ) {
		'ngInject';
	}

	closeDialog(): Promise<any> {
		return this.$mdDialog.hide();
	}

	viewOnMap(): Promise<any> {
		this.$mdDialog.hide();
		this.$state.go('map');
		return this.$mdSidenav('right').open();
	}

	viewInTour(): Promise<any> {
		this.$mdDialog.hide();
		this.$state.go('building');
		return this.$mdSidenav('right').close();
	}
};
