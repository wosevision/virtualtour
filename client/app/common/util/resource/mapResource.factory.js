function MapResourceFactory($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return {
  	category: $resource(GLOBAL_SETTINGS.apiUrl + '/categories/:id'),
  	feature: $resource(GLOBAL_SETTINGS.apiUrl + '/features/:id'),
  	collection: $resource(GLOBAL_SETTINGS.apiUrl + '/feature-collections/:id')
  }
}

export default MapResourceFactory;
