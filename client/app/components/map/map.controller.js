class MapController {
	constructor($state) {
		'ngInject';
		this._$state = $state;
	}
	onGotoBldg() {
		return data => {
			this._$state.go('building', data);
		}
	}
}

export default MapController;
