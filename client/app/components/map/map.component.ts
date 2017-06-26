import template from './map.html';

export const MapComponent: ng.IComponentOptions = {
  bindings: {},
  template,
  controller: class MapController implements ng.IController {
  	$state;
		constructor($state) {
			'ngInject';
			this.$state = $state;
		}
		onGotoBldg() {
			return data => {
				this.$state.go('building', data);
			}
		}
	}
};