import template from './map.html';

export const MapComponent: ng.IComponentOptions = {
  bindings: {},
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
  },
  template: `<campus-map
    map-data="$ctrl.mapData"
    on-goto-bldg="$ctrl.onGotoBldg()"
    layout
    flex="grow">
    <campus-map-controls ng-model="$ctrl.mapData" layout="column" flex="grow"></campus-map-controls>
  </campus-map>`,
};