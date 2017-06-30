import { GLOBAL_SETTINGS } from '../global.constant';

export class MapResourceService {
  category: ng.resource.IResourceClass<any[]>;
  feature: ng.resource.IResourceClass<any[]>;
  collection: ng.resource.IResourceClass<any[]>;
  constructor(
    private $resource
  ) {
    'ngInject';
  	this.category = $resource(GLOBAL_SETTINGS.apiUrl + '/categories/:id'),
  	this.feature = $resource(GLOBAL_SETTINGS.apiUrl + '/features/:id'),
  	this.collection = $resource(GLOBAL_SETTINGS.apiUrl + '/feature-collections/:id')
  }
}
