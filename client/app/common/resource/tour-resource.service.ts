import { Inject, Injectable } from 'ng-metadata/core';

import { GLOBAL_SETTINGS } from '../global.constant';

@Injectable()
export class TourResourceService {
  location: ng.resource.IResourceClass<any[]>;
  building: ng.resource.IResourceClass<any[]>;
  scene: ng.resource.IResourceClass<any[]>;
  preload: ng.resource.IResourceClass<any[]>;
  entity: ng.resource.IResourceClass<any[]>;
  constructor(
    @Inject('$resource') private $resource,
  ) {
    'ngInject';
    this.location = this.$resource(GLOBAL_SETTINGS.apiUrl + '/locations/:id'),
    this.building = this.$resource(GLOBAL_SETTINGS.apiUrl + '/buildings/:id'),
    this.scene = this.$resource(GLOBAL_SETTINGS.apiUrl + '/scenes/:id', null, {
      'update': { method: 'PATCH' }
    });
    this.preload = this.$resource(GLOBAL_SETTINGS.apiUrl + '/scenes/:id/preload', null, {
      'get': {method:'GET', isArray:true}
    });
    this.entity = this.$resource(GLOBAL_SETTINGS.apiUrl + '/entities/:id')
  }
}
