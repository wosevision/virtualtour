import { GLOBAL_SETTINGS } from '../global.constant';

export class TourResourceService {
  location: ng.resource.IResourceService;
  building: ng.resource.IResourceService;
  scene: ng.resource.IResourceService;
  preload: ng.resource.IResourceService;
  entity: ng.resource.IResourceService;
  constructor(
    private $resource
  ) {
    'ngInject';
    this.location = $resource(GLOBAL_SETTINGS.apiUrl + '/locations/:id'),
    this.building = $resource(GLOBAL_SETTINGS.apiUrl + '/buildings/:id'),
    this.scene = $resource(GLOBAL_SETTINGS.apiUrl + '/scenes/:id', null, {
      'update': { method: 'PATCH' }
    });
    this.preload = $resource(GLOBAL_SETTINGS.apiUrl + '/scenes/:id/preload', null, {
      'get': {method:'GET', isArray:true}
    });
    this.entity = $resource(GLOBAL_SETTINGS.apiUrl + '/entities/:id')
  }
}
