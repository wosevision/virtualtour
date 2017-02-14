class MapCtrl {
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

function MapConfig($stateProvider) {
  'ngInject'
	$stateProvider
    .state('map', {
      parent: 'home',
      controller: MapCtrl,
      controllerAs: '$ctrl',
      template: `<campus-map
		  	map-data="$ctrl.mapData"
		  	on-goto-bldg="$ctrl.onGotoBldg()"
		  	layout
		  	flex="grow">
		  	<campus-map-controls ng-model="$ctrl.mapData" layout="column" flex="grow"></campus-map-controls>
		  </campus-map>`
    });
}

export default {
  name: 'MapConfig',
  fn: MapConfig
};