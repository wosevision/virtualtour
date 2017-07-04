import { Inject, Injectable } from 'ng-metadata/core';

import { GLOBAL_SETTINGS } from '../global.constant';

@Injectable()
export class MapResourceService {
  category: ng.resource.IResourceClass<any[]>;
  feature: ng.resource.IResourceClass<any[]>;
  collection: ng.resource.IResourceClass<any[]>;
  constructor(
    @Inject('$resource') private $resource
  ) {
    'ngInject';
  	this.category = this.$resource(GLOBAL_SETTINGS.apiUrl + '/categories/:id'),
  	this.feature = this.$resource(GLOBAL_SETTINGS.apiUrl + '/features/:id'),
  	this.collection = this.$resource(GLOBAL_SETTINGS.apiUrl + '/feature-collections/:id')
  }
}
