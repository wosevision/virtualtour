class InfoController {
	constructor($state, $sce, $mdSidenav, $mdDialog) {
		'ngInject';
		this.$state = $state;
		this.$sce = $sce;
		this.$mdSidenav = $mdSidenav;
		this.$mdDialog = $mdDialog;
	}
	closeDialog() {
		this.$mdDialog.hide();
	}
	viewOnMap() {
		this.$mdDialog.hide();
		this.$state.go('map');
		this.$mdSidenav('right').open();
	}
	viewInTour() {
		this.$mdDialog.hide();
		this.$state.go('building');
		this.$mdSidenav('right').close();
	}

}

export default InfoController;
