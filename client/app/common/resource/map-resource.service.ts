import { GLOBAL_SETTINGS } from '../global.constant';

export class MapResourceService {
  category: ng.resource.IResourceService;
  feature: ng.resource.IResourceService;
  collection: ng.resource.IResourceService;
  constructor(
    private $resource
  ) {
    'ngInject';
  	this.category = $resource(GLOBAL_SETTINGS.apiUrl + '/categories/:id'),
  	this.feature = $resource(GLOBAL_SETTINGS.apiUrl + '/features/:id'),
  	this.collection = $resource(GLOBAL_SETTINGS.apiUrl + '/feature-collections/:id')
  }
}
