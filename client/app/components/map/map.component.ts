import template from './map.html';

export const MapComponent: ng.IComponentOptions = {
  bindings: {},
  template,
  controller: class MapController implements ng.IController {
		constructor(
			private $state: ng.ui.IStateService,
		) {
			'ngInject';
			this.$state = $state;
		}

		onGotoBldg(): Function {
			return (data: object) => {
				this.$state.go('building', data);
			}
		}
	}
};