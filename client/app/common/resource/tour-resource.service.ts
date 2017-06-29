import { GLOBAL_SETTINGS } from '../global.constant';

export class TourResourceService {
  location: ng.resource.IResourceClass<any[]>;
  building: ng.resource.IResourceClass<any[]>;
  scene: ng.resource.IResourceClass<any[]>;
  preload: ng.resource.IResourceClass<any[]>;
  entity: ng.resource.IResourceClass<any[]>;
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
